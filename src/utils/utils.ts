import Palette from '../palette/Palette';
import PaletteUtils from '../palette/PaletteUtils';
import { Process } from '../process/Process';

// General utility functions

export const vec3distance = (a: number[], b: number[]): number => {
  return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]) + (a[2] - b[2]) * (a[2] - b[2]);
};

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

export const getComplexityRating = (process: Process, palette: Palette): number => {
  return process.complexity(PaletteUtils.getSize(palette));
};
