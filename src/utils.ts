import ColorPalette from "./ColorPalette";
import DitherStyle from "./DitherStyle";
import PaletteType from "./PaletteGroups";
import { getPalette, PaletteGenOptions } from "./scratchpad";

export function distance2(a: number[], b: number[]): number {
  let d = 0;
  for (let i = 0; i < 3; i++) d += (a[i] - b[i]) * (a[i] - b[i]);
  return d;
}

export const loadFile = (e: Event): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const input = e.target as HTMLInputElement;
    if (input?.files) {
      const file = input.files[0];
      const img = new Image();
      img.onload = () => resolve(img);

      img.src = URL.createObjectURL(file);
    } else reject();
  });
};

// Default palette mapping
// Uses a simple distance check
function defPaletteMap(color: number[], palette: ColorPalette): number[] {
  let closest: number[] = [];

  let dMin = Number.POSITIVE_INFINITY;
  palette.data.forEach(pColor => {
    const dsq = distance2(color, pColor);

    if (dsq <= dMin) {
      closest = pColor;
      dMin = dsq;
    }
  });

  return closest;
}

function clampedRGBPaletteMap(color: number[], palette: ColorPalette): number[] {
  const levels = palette.data[0].map(bits => Math.pow(2, bits));
  const clamped = [...color];

  for (let i = 0; i < 3; i++) {
    const segment = Math.floor(color[i] / (256 / levels[i]));
    clamped[i] = segment * (255 / (levels[i] - 1));
  }

  return clamped;
}

function paletteMap(color: number[], palette: ColorPalette): number[] {
  switch (palette.type) {
    case PaletteType.PRGB:
      return clampedRGBPaletteMap(color, palette);
    default:
      return defPaletteMap(color, palette);
  }
}

export function convertToPalette(
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

    // Replace the "template" auto palette with the appropriate
    // palette generated from the image
    palette = getPalette(options, imageData);
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

export function isPalette(entry: string | ColorPalette): entry is ColorPalette {
  return (entry as ColorPalette).data !== undefined;
}
