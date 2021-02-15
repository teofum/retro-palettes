import prepPalette from '../palette/prepPalette';
import ProcessWorker from '../process/ProcessWorker';
import { ImagePart, RenderOptions } from '../utils/RenderUtils';
import { getComplexityRating } from '../utils/utils';
import UIWindow from './Window';

export const threadsAvailable = navigator.hardwareConcurrency;
export const maxAutoThreads = Math.max(~~(threadsAvailable / 2), 1);

const activeWorkers: ProcessWorker[] = [];

class RenderWindow extends UIWindow {
  private inputCanvasRef: HTMLCanvasElement;
  private outputCanvasRef: HTMLCanvasElement;
  private flash: HTMLElement;

  public get inputCanvas(): HTMLCanvasElement { return this.inputCanvasRef; }
  public get outputCanvas(): HTMLCanvasElement { return this.outputCanvasRef; }

  constructor(title: string, renderSize: { w: number, h: number }) {
    super(title, '/public/img/result.png');

    // Append an input and output canvas
    this.inputCanvasRef = document.createElement('canvas') as HTMLCanvasElement;
    this.inputCanvasRef.width = renderSize.w;
    this.inputCanvasRef.height = renderSize.h;

    this.outputCanvasRef = document.createElement('canvas') as HTMLCanvasElement;
    this.outputCanvasRef.classList.add('output-canvas');

    this.flash = document.createElement('div');
    this.flash.classList.add('flash');

    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('canvas-container');
    canvasContainer.appendChild(this.inputCanvasRef);
    canvasContainer.appendChild(this.outputCanvasRef);
    canvasContainer.appendChild(this.flash);

    this.content.appendChild(canvasContainer);

    // Set titlebar max width
    const titlebar = this.frame.getElementsByClassName('titlebar')[0];
    (titlebar as HTMLElement).style.setProperty('max-width', `${renderSize.w + 4}px`);
  }

  public render(image: CanvasImageSource, options: RenderOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      // Prepare output canvas and draw image to input canvas
      this.outputCanvas.width = this.inputCanvas.width;
      this.outputCanvas.height = this.inputCanvas.height;

      const ctxIn = this.inputCanvas.getContext('2d');
      if (!ctxIn) throw new Error('Unable to get input context');

      const ctxOut = this.outputCanvas.getContext('2d');
      if (!ctxOut) throw new Error('Unable to get output context');

      ctxIn.drawImage(image, 0, 0, this.inputCanvas.width, this.inputCanvas.height);

      // Do any palette processing here so it's done on the whole image
      // and generated palettes are cached properly
      let startTime = new Date().getTime();
      const imageData = ctxIn.getImageData(0, 0, this.inputCanvas.width, this.inputCanvas.height);
      const palette = prepPalette(options.palette, options.process, imageData);
      console.log(`Palette processing done in ${new Date().getTime() - startTime}ms`);

      // Set the number of threads to use
      let nThreads: number;
      if (!options.process.supports.threads) nThreads = 1;
      else if (options.threads === 'auto') {
        // Calculate the number of threads needed based on
        // process complexity and image size
        const cr = getComplexityRating(options.process, palette);
        const size = this.inputCanvas.width * this.inputCanvas.height;

        // Assign roughly one thread per 50k pixels for a complexity rating of 2048
        // CR=2048 is a 64 color palette at O(n²/2) or 8 color palette at O(n²/2 * 64)
        const wantThreads = ~~(size / 50000 * cr / 2048) + 1;

        // Need at least one thread, limit to max auto threads (half the available threads)
        nThreads = (wantThreads > maxAutoThreads ? maxAutoThreads : wantThreads);

        console.log(`Want ${wantThreads} threads for ${size}px @CR${cr}, got ${nThreads} (max ${maxAutoThreads})`);
      } else nThreads = options.threads;
      let activeThreads: number = 0;

      // Ensure part width is a multiple of 8, prevents dithering seams
      const partWidth = ~~(this.inputCanvas.width / nThreads / 8) * 8;
      // Account for the last few pixels that may have been lost in rounding
      const error = this.inputCanvas.width - (partWidth * nThreads);

      startTime = new Date().getTime();
      for (let t = 0; t < nThreads; t++) {
        const err8 = ~~(error / 8);
        const x = t * partWidth + 8 * (err8 < t ? err8 : t);
        const w = partWidth + (t === nThreads - 1 ? error % 8 : err8 > t ? 8 : 0);
        const partData = ctxIn.getImageData(x, 0, w, this.inputCanvas.height);
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
            this.flash.classList.add('flash-anim');
            console.log(`${nThreads} worker threads done in ${endTime - startTime}ms`);
            resolve();
          }
        };

        worker.onerror = (error) => reject(`Error in worker thread: ${error}`);

        console.log(`Starting worker thread ${t + 1}/${nThreads} w=${w}`);
        worker.start(part, palette, options.process.id, 'cdRGB', options.features);
        activeThreads++;
        activeWorkers.push(worker);
      }
    });
  }
}

export const terminateAllWorkers = (): void => {
  activeWorkers.forEach(worker => worker.terminate());
  activeWorkers.splice(0);
};

export default RenderWindow;