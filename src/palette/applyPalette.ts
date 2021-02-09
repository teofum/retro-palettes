import { Process } from '../process/Process';
import ColorPalette from './ColorPalette';
import PaletteType from './PaletteGroups';
import { getAutoPalette } from '../paletteGen/getAutoPalette';
import ColorDistanceFn from '../colorDistance/ColorDistanceFn';

export function applyPalette(
  cvIn: HTMLCanvasElement,
  cvOut: HTMLCanvasElement,
  palette: ColorPalette,
  process: Process,
  distFn: ColorDistanceFn
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
  process.function(imageData, palette, distFn);
  ctxOut?.putImageData(imageData, 0, 0);
}
