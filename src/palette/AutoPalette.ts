import { generatePalette } from '../paletteGen/PaletteGenerator';
import Palette from './Palette';

export interface AutoPaletteOptions {
  size: number;
  reservedLevel: number;
  levels: number;
  thresholdCoeff: number;
}

const paletteCache: { key: string, palette: Palette }[] = [];

export function getAutoPalette(
  options: AutoPaletteOptions,
  imageData: ImageData
): Palette {
  const key = `AUTO_${options.size}L${options.levels}R${options.reservedLevel}`;
  const cached = paletteCache.find(entry => entry.key === key);

  if (cached) return cached.palette;
  else {
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