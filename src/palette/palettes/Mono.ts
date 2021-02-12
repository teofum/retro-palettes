import Palette from '../Palette';
import PaletteGroup from '../PaletteGroup';
import PaletteType from '../PaletteType';

export const Mono2W: Palette = {
  name: 'Black/White (1-bit MC)',
  type: PaletteType.Mono,
  group: PaletteGroup.Mono,
  data: [2, 255, 255, 255, 0]
};

export const Mono2G: Palette = {
  name: 'Black/Green (1-bit MC)',
  type: PaletteType.Mono,
  group: PaletteGroup.Mono,
  data: [2, 0, 255, 0, 0]
};

export const Mono2A: Palette = {
  name: 'Black/Amber (1-bit MC)',
  type: PaletteType.Mono,
  group: PaletteGroup.Mono,
  data: [2, 255, 200, 15, 0]
};

export const Mono4W: Palette = {
  name: '4-tone Greyscale (2-bit MC)',
  type: PaletteType.Mono,
  group: PaletteGroup.Mono,
  data: [4, 255, 255, 255, 0]
};
