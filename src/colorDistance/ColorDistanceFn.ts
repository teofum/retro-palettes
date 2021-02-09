import { srgb2lab } from '../utils/colorUtils';
import { vec3distance } from '../utils/utils';

type ColorDistanceFn = (color1: number[], color2: number[]) => number;

// Simple, fast RGB space distance calculation.
export function colDistRGB(color1: number[], color2: number[]): number {
  return vec3distance(color1, color2);
}

const labCache: { [key: number]: number[] } = {};

// Computes color distance in CIE-L*ab space. Slower, but more visually accurate.
export function colDistLab(color1: number[], color2: number[]): number {
  const c1index = color1[0] + (color1[1] << 8) + (color1[2] << 16);
  const c2index = color2[0] + (color2[1] << 8) + (color2[2] << 16);

  let lab1 = labCache[c1index];
  if (!lab1) {
    lab1 = srgb2lab(color1);
    labCache[c1index] = lab1;
  }
  
  let lab2 = labCache[c2index];
  if (!lab2) {
    lab2 = srgb2lab(color2);
    labCache[c2index] = lab2;
  }

  return vec3distance(lab1, lab2);
}

export const getColorDistanceFnById = (id: string): ColorDistanceFn => {
  switch (id) {
    case 'cdLab':
      return colDistLab;
    case 'cdRGB':
    default:
      return colDistRGB;
  }
};

export default ColorDistanceFn;