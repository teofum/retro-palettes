import Renderer from '../render/Renderer';
import { RenderOptions } from '../render/RenderUtils';
import UIWindow from './Window';

class RenderWindow extends UIWindow {
  private inputCanvasRef: HTMLCanvasElement;
  private outputCanvasRef: HTMLCanvasElement;
  private flash: HTMLElement;
  private renderer: Renderer;

  private originalButton: HTMLButtonElement;

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

    // Append a menu bar
    const saveIcon = document.createElement('img');
    saveIcon.src = './public/img/save.png';

    const saveButton = document.createElement('button');
    saveButton.className = 'win-bevel hover light icon-button';
    saveButton.title = 'Save';
    saveButton.addEventListener('click', this.save);
    saveButton.appendChild(saveIcon);

    const originalIcon = document.createElement('img');
    originalIcon.src = './public/img/original.png';

    this.originalButton = document.createElement('button');
    this.originalButton.className = 'win-bevel hover light icon-button';
    this.originalButton.title = 'View original image';
    this.originalButton.addEventListener('click', this.toggleViewOriginal);
    this.originalButton.appendChild(originalIcon);

    const menuBar = document.createElement('div');
    menuBar.className = 'menubar';
    menuBar.appendChild(saveButton);
    menuBar.appendChild(this.originalButton);

    this.frame.appendChild(menuBar);

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

  public save = (): void => {
    const dataUrl = this.outputCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.setAttribute('download', 'result.png');
    link.setAttribute('href', dataUrl);
    link.click();
  }

  public toggleViewOriginal = (): void => {
    if (this.outputCanvas.classList.contains('clip')) {
      this.outputCanvas.classList.remove('clip');
      this.originalButton.classList.remove('inset');
      this.originalButton.classList.remove('checkered');
      this.originalButton.classList.add('hover');
    } else {
      this.outputCanvas.classList.add('clip');
      this.originalButton.classList.add('inset');
      this.originalButton.classList.add('checkered');
      this.originalButton.classList.remove('hover');
    }
  }
}

export default RenderWindow;