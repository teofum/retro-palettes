import { srgb2lab } from '../utils/colorUtils';
import { vec3distance } from '../utils/utils';

type ColorDistanceFn = (color1: number[], color2: number[]) => number;

// Simple, fast RGB space distance calculation.
export function colDistRGB(color1: number[], color2: number[]): number {
  return vec3distance(color1, color2);
}

// Computes color distance in CIE-L*ab space. Slower, but more visually accurate.
export function colDistLab(color1: number[], color2: number[]): number {
  return vec3distance(srgb2lab(color1), srgb2lab(color2));
}

export default ColorDistanceFn;