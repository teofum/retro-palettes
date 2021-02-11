import CompareFn from '../colorDistance/CompareFn';
import ColorPalette from './ColorPalette';

// Default palette mapping
// Uses a simple distance check
export function paletteMap(
  color: number[],
  palette: ColorPalette,
  distFn: CompareFn
): number[] {
  let closest: number[] = [];

  let dMin = Number.POSITIVE_INFINITY;
  palette.data.forEach(pColor => {
    const dsq = distFn(color, pColor);

    if (dsq <= dMin) {
      closest = pColor;
      dMin = dsq;
    }
  });

  return closest;
}