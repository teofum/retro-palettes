import { distance2 } from '../utils';
import ColorPalette from './ColorPalette';
import PaletteType from './PaletteGroups';

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

export function paletteMap(color: number[], palette: ColorPalette): number[] {
  switch (palette.type) {
    case PaletteType.PRGB:
      return clampedRGBPaletteMap(color, palette);
    default:
      return defPaletteMap(color, palette);
  }
}