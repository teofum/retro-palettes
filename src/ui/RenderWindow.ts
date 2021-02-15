import Renderer from '../render/Renderer';
import { RenderOptions } from '../render/RenderUtils';
import UIWindow from './Window';

class RenderWindow extends UIWindow {
  private inputCanvasRef: HTMLCanvasElement;
  private outputCanvasRef: HTMLCanvasElement;
  private flash: HTMLElement;
  private renderer: Renderer;

  public get inputCanvas(): HTMLCanvasElement { return this.inputCanvasRef; }
  public get outputCanvas(): HTMLCanvasElement { return this.outputCanvasRef; }

  constructor(title: string, renderSize: { w: number, h: number }) {
    super(title, './public/img/result.png');

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

    // Create the renderer
    this.renderer = new Renderer(this.inputCanvas, this.outputCanvas);

    // Set titlebar max width
    const titlebar = this.frame.getElementsByClassName('titlebar')[0];
    (titlebar as HTMLElement).style.setProperty('max-width', `${renderSize.w + 4}px`);
  }

  public render(image: CanvasImageSource, options: RenderOptions): Promise<void> {
    return this.renderer.render(image, options).then(() => {
      this.flash.classList.add('flash-anim');
    });
  }
}

export default RenderWindow;