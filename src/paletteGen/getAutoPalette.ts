import ColorPalette from '../palette/ColorPalette';
import { generatePalette, PaletteGenOptions } from './PaletteGenerator';

const paletteCache: { key: string, palette: ColorPalette }[] = [];

export function getAutoPalette(
  template: ColorPalette,
  imageData: ImageData
): ColorPalette {
  const key = `AUTO_${template.data[0][0]}_${template.data[1][2]}`;
  const cached = paletteCache.find(entry => entry.key === key);

  if (cached) return cached.palette;
  else {
    const options: PaletteGenOptions = {
      numColors: template.data[0][0],
      reservedLevel: template.data[0][1],
      levels: template.data[0][2],
      inclThresholdCoeff: template.data[1][0]
    };

    // Replace the 'template' auto palette with the appropriate
    // palette generated from the image
    const palette = generatePalette(options, imageData);
    paletteCache.push({ key, palette });
    return palette;
  }
}

export function clearPaletteCache(): void {
  paletteCache.splice(0);
}
