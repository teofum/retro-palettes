import prepPalette from '../palette/prepPalette';
import ProcessWorker from '../process/ProcessWorker';
import { getComplexityRating } from '../utils/utils';
import { RenderOptions, ImagePart } from './RenderUtils';

export const threadsAvailable = navigator.hardwareConcurrency;
export const maxAutoThreads = Math.max(~~(threadsAvailable / 2), 1);

const activeWorkers: ProcessWorker[] = [];

class Renderer {
  private inputCanvasRef: HTMLCanvasElement;
  private outputCanvasRef: HTMLCanvasElement;

  public get inputCanvas(): HTMLCanvasElement { return this.inputCanvasRef; }
  public get outputCanvas(): HTMLCanvasElement { return this.outputCanvasRef; }

  constructor(cvIn: HTMLCanvasElement, cvOut: HTMLCanvasElement) {
    this.inputCanvasRef = cvIn;
    this.outputCanvasRef = cvOut;
  }

  public render(image: CanvasImageSource, options: RenderOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      // Prepare output canvas and draw image to input canvas
      this.outputCanvas.width = this.inputCanvas.width;
      this.outputCanvas.height = this.inputCanvas.height;

      let ctxIn = this.inputCanvas.getContext('2d');
      if (!ctxIn) throw new Error('Unable to get input context');

      const ctxOut = this.outputCanvas.getContext('2d');
      if (!ctxOut) throw new Error('Unable to get output context');

      let renderWidth = this.inputCanvas.width;
      let renderHeight = this.inputCanvas.height;
      ctxIn.drawImage(image, 0, 0, renderWidth, renderHeight);

      if (options.scaling) {
        const scaledInputCanvas = document.createElement('canvas');
        scaledInputCanvas.width = ~~(this.inputCanvas.width / options.scaling);
        scaledInputCanvas.height = ~~(this.inputCanvas.height / options.scaling);

        // Truncate input to account for rounding error
        this.outputCanvas.width = this.inputCanvas.width = scaledInputCanvas.width * options.scaling;
        this.outputCanvas.height = this.inputCanvas.height = scaledInputCanvas.height * options.scaling;
        ctxIn.drawImage(image, 0, 0, renderWidth, renderHeight);

        ctxIn = scaledInputCanvas.getContext('2d');
        if (!ctxIn) throw new Error('Unable to get scaled input context');

        renderWidth = scaledInputCanvas.width;
        renderHeight = scaledInputCanvas.height;
        ctxIn.drawImage(image, 0, 0, renderWidth, renderHeight);
        ctxOut.imageSmoothingEnabled = false;
      }

      // Do any palette processing here so it's done on the whole image
      // and generated palettes are cached properly
      let startTime = new Date().getTime();
      const imageData = ctxIn.getImageData(0, 0, renderWidth, renderHeight);
      const palette = prepPalette(options.palette, options.process, imageData);
      console.log(`Palette processing done in ${new Date().getTime() - startTime}ms`);

      // Set the number of threads to use
      let nThreads: number;
      if (!options.process.supports.threads) nThreads = 1;
      else if (options.threads === 'auto') {
        // Calculate the number of threads needed based on
        // process complexity and image size
        const cr = getComplexityRating(options.process, palette);
        const size = renderWidth * renderHeight;

        // Assign roughly one thread per 50k pixels for a complexity rating of 2048
        // CR=2048 is a 64 color palette at O(n²/2) or 8 color palette at O(n²/2 * 64)
        const wantThreads = ~~(size / 50000 * cr / 2048) + 1;

        // Need at least one thread, limit to max auto threads (half the available threads)
        nThreads = (wantThreads > maxAutoThreads ? maxAutoThreads : wantThreads);

        console.log(`Want ${wantThreads} threads for ${size}px @CR${cr}, got ${nThreads} (max ${maxAutoThreads})`);
      } else nThreads = options.threads;
      let activeThreads: number = 0;

      // Ensure part width is a multiple of 8, prevents dithering seams
      const partWidth = ~~(renderWidth / nThreads / 8) * 8;
      // Account for the last few pixels that may have been lost in rounding
      const error = renderWidth - (partWidth * nThreads);

      startTime = new Date().getTime();
      for (let t = 0; t < nThreads; t++) {
        const err8 = ~~(error / 8);
        const x = t * partWidth + 8 * (err8 < t ? err8 : t);
        const w = partWidth + (t === nThreads - 1 ? error % 8 : err8 > t ? 8 : 0);
        const partData = ctxIn.getImageData(x, 0, w, renderHeight);
        if (!partData) reject('Unable to get image data from context');

        const part: ImagePart = { data: partData, x: x, y: 0 };
        const worker = new ProcessWorker();

        worker.onprogress = (progress) => {
          const ox = options.scaling ? x * options.scaling : x;
          const ow = options.scaling ? w * options.scaling : w;

          const line = progress.current / (w * 4) * (options.scaling || 1);

          if (progress.partial) {
            ctxOut.putImageData(progress.partial.data, ox, 0);
            if (options.scaling)
              ctxOut.drawImage(
                this.outputCanvas,
                ox, 0, w, progress.current / (w * 4),
                ox, 0, ow, line
              );
          }

          ctxOut.fillStyle = '#ff00ff';
          ctxOut.fillRect(ox, line, ow, 2);
        };

        worker.onfinish = (result) => {
          const ox = options.scaling ? x * options.scaling : x;
          const ow = options.scaling ? w * options.scaling : w;

          ctxOut.putImageData(result.data, ox, 0);
          if (options.scaling)
            ctxOut.drawImage(
              this.outputCanvas,
              ox, 0, w, renderHeight,
              ox, 0, ow, renderHeight * options.scaling
            );

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

export default Renderer;