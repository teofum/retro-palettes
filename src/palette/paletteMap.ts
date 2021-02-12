import CompareFn from '../color/CompareFn';
import Palette from './Palette';
import PaletteUtils from './PaletteUtils';

// Default palette mapping
// Uses a simple distance check
export function paletteMap(
  color: number[],
  palette: Palette,
  distFn: CompareFn
): readonly number[] {
  let closest: readonly number[] = [];

  let dMin = Number.POSITIVE_INFINITY;
  for (let i = 0; i < PaletteUtils.getSize(palette); i++) {
    const pColor = PaletteUtils.getColor(palette, i);
    const dsq = distFn(color, pColor);

    if (dsq <= dMin) {
      closest = pColor;
      dMin = dsq;
    }
  };

  return closest;
}