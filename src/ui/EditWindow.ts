import Palette from '../palette/Palette';
import PaletteType from '../palette/PaletteType';
import { color2hex, hex2color } from '../utils/utils';
import UIWindow from './Window';

class EditWindow extends UIWindow {
  private customPalette?: Palette;
  private colorsList: HTMLElement;
  private renameInput: HTMLInputElement;

  public onchange?: () => void;
  public onnamechange?: (palette: Palette) => void;

  constructor(palette: Palette) {
    super('Edit Palette', './public/img/color.png');

    this.content.classList.remove('win-bevel');

    this.colorsList = document.createElement('ul');
    this.colorsList.className = 'edit-color-list';
    this.content.appendChild(this.colorsList);

    const newIcon = document.createElement('img');
    newIcon.src = './public/img/new.png';

    this.renameInput = document.createElement('input');
    this.renameInput.className = 'win-bevel edit-rename';
    this.renameInput.addEventListener('change',
      () => this.updatePaletteName(this.renameInput.value));

    const addColorIcon = document.createElement('img');
    addColorIcon.src = './public/img/coloradd.png';

    const addColorButton = document.createElement('button');
    addColorButton.className = 'win-bevel hover light icon-button';
    addColorButton.appendChild(addColorIcon);
    addColorButton.addEventListener('click',
      () => this.addColor([0, 0, 0]));
      
    const menuBar = document.createElement('div');
    menuBar.className = 'menubar';
    menuBar.appendChild(this.renameInput);
    menuBar.appendChild(addColorButton);

    this.frame.appendChild(menuBar);

    this.loadCustomPalette(palette);
  }

  public loadCustomPalette(palette: Palette): void {
    if (palette.type !== PaletteType.Indexed)
      throw new Error('Non-Indexed palettes may not be modified.');

    this.customPalette = palette;

    // Remove all current color entries and replace with the palette's
    while (this.colorsList.firstChild)
      this.colorsList.removeChild(this.colorsList.firstChild);

    const colorCount = palette.data.length / 3;
    for (let i = 0; i < colorCount; i++)
      this.addColorItem(palette.data.slice(i * 3, i * 3 + 3));

    this.title = `Edit Palette: ${palette.name}`;
    this.renameInput.value = palette.name;
  }

  private updatePaletteName(newName: string): void {
    if (!this.customPalette) return;
    this.customPalette.name = newName;
    this.title = `Edit Palette: ${this.customPalette.name}`;

    if (this.onnamechange) this.onnamechange(this.customPalette);
  }

  private updateColor(index: number, newColor: number[]): void {
    if (!this.customPalette) return;

    const dataIndex = index * 3;
    if (dataIndex >= this.customPalette.data.length)
      throw new Error('Attempting to modify a non-existent color.');

    for (let i = 0; i < 3; i++)
      this.customPalette.data[dataIndex + i] = newColor[i];

    if (this.onchange) this.onchange();
  }

  private addColor(color: number[]): void {
    if (!this.customPalette) return;

    this.customPalette.data.push(...color);
    this.addColorItem(color);
    
    if (this.onchange) this.onchange();
  }

  private removeColor(index: number): void {
    if (!this.customPalette) return;

    const dataIndex = index * 3;
    if (dataIndex >= this.customPalette.data.length)
      throw new Error('Attempting to remove a non-existent color.');

    this.customPalette.data.splice(dataIndex, 3);
    
    if (this.onchange) this.onchange();
  }

  private addColorItem(color: number[]): HTMLElement {
    if (!this.customPalette) throw new Error('No palette loaded.');

    // Add the new color to the palette
    const cssColor = color2hex(color);

    // Create the list element...
    const colorItem = document.createElement('li');
    colorItem.className = 'edit-color-item';

    const removeIcon = document.createElement('img');
    removeIcon.src = './public/img/remove.png';

    const removeButton = document.createElement('button');
    removeButton.className = 'win-bevel icon-button';
    removeButton.appendChild(removeIcon);
    removeButton.addEventListener('click',
      () => this.removeColorItem(colorItem));

    const colorPreview = document.createElement('div');
    colorPreview.className = 'win-bevel content edit-preview';
    colorPreview.style.backgroundColor = cssColor;

    const colorInput = document.createElement('input');
    colorInput.className = 'win-bevel';
    colorInput.type = 'text';
    colorInput.placeholder = '#XXXXXX';
    colorInput.value = cssColor;
    colorInput.addEventListener('keyup',
      () => this.inputHandler(colorItem, colorInput.value, colorPreview));

    colorItem.appendChild(colorPreview);
    colorItem.appendChild(colorInput);
    colorItem.appendChild(removeButton);

    this.colorsList.appendChild(colorItem);
    return colorItem;
  }

  private removeColorItem(item: HTMLElement) {
    const colorIndex = this.getItemIndex(item);
    item.remove();
    this.removeColor(colorIndex);
  }

  private inputHandler(item: HTMLElement, input: string, preview: HTMLElement): void {
    if (!input.match(/^#[0-9a-fA-F]{6}$/g)) {
      item.getElementsByTagName('input')[0].style.setProperty('background-color', '#FFAAAA');
      return;
    }

    item.getElementsByTagName('input')[0].style.removeProperty('background-color');

    const colorIndex = this.getItemIndex(item);
    preview.style.backgroundColor = input;
    this.updateColor(colorIndex, hex2color(input));
  }

  private getItemIndex(item: HTMLElement): number {
    let colorIndex = -1;
    const items = this.colorsList.children;
    for (let i = 0; i < items.length; i++)
      if (item === items[i]) {
        colorIndex = i;
        break;
      }
    
    return colorIndex;
  }
}

export default EditWindow;