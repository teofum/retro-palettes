import { Process } from '../process/Process';
import ColorPalette from './ColorPalette';
import PaletteType from './PaletteGroups';
import { getAutoPalette } from '../paletteGen/getAutoPalette';
import CompareFn from '../colorDistance/CompareFn';
import ProcessWorker from '../process/ProcessWorker';
import prepPalette from './prepPalette';
import { getComplexityRating } from '../utils/utils';

export const threadsAvailable = navigator.hardwareConcurrency;
export const maxAutoThreads = Math.max(~~(threadsAvailable / 2), 1);

const activeWorkers: ProcessWorker[] = [];

export interface ProcessFeatures {
  gamma: boolean;
  threads: number | 'auto';
}

export interface ImagePart {
  data: ImageData;
  x: number;
  y: number;
}

export function processImage(
  cvIn: HTMLCanvasElement,
  cvOut: HTMLCanvasElement,
  palette: ColorPalette,
  process: Process,
  distFn: CompareFn,
  features: ProcessFeatures
): void {
  cvOut.width = cvIn.width;
  cvOut.height = cvIn.height;

  const ctxIn = cvIn.getContext('2d');
  if (!ctxIn) throw new Error('Unable to get input context');

  const ctxOut = cvOut.getContext('2d');
  if (!ctxOut) throw new Error('Unable to get output context');

  const imageData = ctxIn.getImageData(0, 0, cvIn.width, cvIn.height);
  if (!imageData) throw new Error('Unable to get image data from context');

  // Special handling for certain palettes
  if (palette.type === PaletteType.PAuto) palette = getAutoPalette(palette, imageData);

  // Convert image using the passed process
  process.procFn(imageData, palette, distFn, features, null);
  ctxOut?.putImageData(imageData, 0, 0);
}

export function processImageAsync(
  cvIn: HTMLCanvasElement,
  cvOut: HTMLCanvasElement,
  palette: ColorPalette,
  process: Process,
  distFnId: string,
  features: ProcessFeatures
): Promise<void> {
  return new Promise((resolve, reject) => {
    cvOut.width = cvIn.width;
    cvOut.height = cvIn.height;

    const ctxIn = cvIn.getContext('2d');
    if (!ctxIn) throw new Error('Unable to get input context');

    const ctxOut = cvOut.getContext('2d');
    if (!ctxOut) throw new Error('Unable to get output context');

    // Do any palette processing here so it's done on the whole image
    // and generated palettes are cached properly
    let startTime = new Date().getTime();
    const imageData = ctxIn.getImageData(0, 0, cvIn.width, cvIn.height);
    palette = prepPalette(palette, process, imageData);
    console.log(`Palette processing done in ${new Date().getTime() - startTime}ms`);

    let nThreads: number;
    if (!process.supports.threads) nThreads = 1;
    else if (features.threads === 'auto') {
      // Calculate the number of threads needed based on
      // process complexity and image size
      const cr = getComplexityRating(process, palette);
      const size = cvIn.width * cvIn.height;

      // Assign roughly one thread per 50k pixels for a complexity rating of 2048
      // CR=2048 is a 64 color palette at O(n²/2) or 8 color palette at O(n²/2 * 64)
      const wantThreads = ~~(size / 50000 * cr / 2048) + 1;

      // Need at least one thread, limit to max auto threads (half the available threads)
      nThreads = (wantThreads > maxAutoThreads ? maxAutoThreads : wantThreads);

      console.log(`Want ${wantThreads} threads for ${size}px @CR${cr}, got ${nThreads} (max ${maxAutoThreads})`);
    } else nThreads = features.threads;
    let activeThreads: number = 0;

    // Ensure part width is a multiple of 8, prevents dithering seams
    const partWidth = ~~(cvIn.width / nThreads / 8) * 8;
    // Account for the last few pixels that may have been lost in rounding
    const error = cvIn.width - (partWidth * nThreads);

    startTime = new Date().getTime();
    for (let t = 0; t < nThreads; t++) {
      const err8 = ~~(error / 8);
      const x = t * partWidth + 8 * (err8 < t ? err8 : t);
      const w = partWidth + (t === nThreads - 1 ? error % 8 : err8 > t ? 8 : 0);
      const partData = ctxIn.getImageData(x, 0, w, cvIn.height);
      if (!partData) reject('Unable to get image data from context');

      const part: ImagePart = { data: partData, x: x, y: 0 };
      const worker = new ProcessWorker();

      worker.onprogress = (progress) => {
        if (progress.partial) ctxOut.putImageData(progress.partial.data, x, 0);
        ctxOut.fillStyle = '#ff00ff';
        ctxOut.fillRect(x, progress.current / (w * 4), w, 2);
      };

      worker.onfinish = (result) => {
        ctxOut.putImageData(result.data, x, 0);
        activeThreads--;
        activeWorkers.splice(activeWorkers.indexOf(worker), 1);

        const endTime = new Date().getTime();
        console.log(`Worker thread ${t + 1} done in ${endTime - startTime}ms`);

        if (activeThreads === 0) {
          console.log(`${nThreads} worker threads done in ${endTime - startTime}ms`);
          resolve();
        }
      };

      worker.onerror = (error) => reject(`Error in worker thread: ${error}`);

      console.log(`Starting worker thread ${t + 1}/${nThreads} w=${w}`);
      worker.start(part, palette, process.id, distFnId, features);
      activeThreads++;
      activeWorkers.push(worker);
    }
  });
}

export const terminateAllWorkers = (): void => {
  activeWorkers.forEach(worker => worker.terminate());
  activeWorkers.splice(0);
};
