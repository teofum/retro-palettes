import ColorPalette from '../palette/ColorPalette';
import PaletteType from '../palette/PaletteGroups';
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

export const expandRGBPalette = (palette: ColorPalette): ColorPalette => {
  if (palette.type !== PaletteType.PRGB) throw new Error('Not an RGB palette');

  const levels = palette.data[0].map(bits => Math.pow(2, bits));
  const expanded: ColorPalette = {
    name: 'EXPANDED_RGB',
    type: PaletteType.POther,
    useAlpha: false,
    data: []
  };

  for (let r = 0; r < levels[0]; r++)
    for (let g = 0; g < levels[1]; g++)
      for (let b = 0; b < levels[2]; b++) {
        const segments = [r, g, b];
        const clamped = [r, g, b];

        for (let i = 0; i < 3; i++)
          clamped[i] = segments[i] * (255 / (levels[i] - 1));

        expanded.data.push(clamped);
      }
    
  return expanded;
};

export const paletteSize = (pal: ColorPalette): number => {
  switch(pal.type) {
    case PaletteType.PRGB:
      return Math.pow(2, pal.data[0][0]) * Math.pow(2, pal.data[0][1]) * Math.pow(2, pal.data[0][2]);
    case PaletteType.PAuto:
      return pal.data[0][0];
    default:
      return pal.data.length;
  }
};

export const getComplexityRating = (process: Process, palette: ColorPalette): number => {
  return process.complexity(paletteSize(palette));
};
