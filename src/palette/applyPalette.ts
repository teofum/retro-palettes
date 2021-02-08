import DitherStyle from '../dithering/DitherStyle';
import { PaletteGenOptions, generatePalette } from '../paletteGen/PaletteGenerator';
import ColorPalette from './ColorPalette';
import PaletteType from './PaletteGroups';
import { paletteMap } from './paletteMap';

export function applyPalette(
  cvIn: HTMLCanvasElement,
  cvOut: HTMLCanvasElement,
  palette: ColorPalette,
  dither: DitherStyle
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
  if (palette.type === PaletteType.PAuto) {
    const options: PaletteGenOptions = {
      numColors: palette.data[0][0],
      reservedLevel: palette.data[0][1],
      levels: palette.data[0][2],
      inclThresholdCoeff: palette.data[1][0]
    };

    // Replace the 'template' auto palette with the appropriate
    // palette generated from the image
    palette = generatePalette(options, imageData);
  }

  const size = imageData.width * imageData.height * 4;
  const line = imageData.width * 4;
  for (let i = 0; i < size; i += 4) {
    const color = Array.from(imageData.data.slice(i, i + 4));
    const mapped: number[] = paletteMap(color, palette);

    for (let j = 0; j < 3; j++)
      imageData.data[i + j] = mapped[j];

    // Apply Floyd-Steinberg dithering if selected
    if (dither === DitherStyle.FloydSteinberg) {
      const error = color.map((ch, i) => ch - mapped[i]);
      for (let j = 0; j < 3; j++) {
        imageData.data[i + 4 + j] += error[j] * 7 / 16;
        imageData.data[i + line - 4 + j] += error[j] * 3 / 16;
        imageData.data[i + line + j] += error[j] * 5 / 16;
        imageData.data[i + line + 4 + j] += error[j] * 1 / 16;
      }
    }
  }

  ctxOut?.putImageData(imageData, 0, 0);
}
