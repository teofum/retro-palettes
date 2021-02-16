import Palette from '../Palette';
import PaletteGroup from '../PaletteGroup';
import PaletteType from '../PaletteType';

export const CMYKU1: Palette = {
  name: 'CMYK (Unmixed, 1 level)',
  type: PaletteType.Indexed,
  group: PaletteGroup.CMYK,
  data: [
    255, 255, 255,
    0, 174, 239,
    236, 0, 140,
    255, 242, 0,
    16, 16, 16
  ]
};

export const CMYKU2: Palette = {
  name: 'CMYK (Unmixed, 2 levels)',
  type: PaletteType.Indexed,
  group: PaletteGroup.CMYK,
  data: [
    255, 255, 255,
    128, 214, 247,
    0, 174, 239,
    246, 128, 198,
    236, 0, 140,
    255, 249, 128,
    255, 242, 0,
    136, 136, 136,
    16, 16, 16
  ]
};

export const CMYKU4: Palette = {
  name: 'CMYK (Unmixed, 4 levels)',
  type: PaletteType.Indexed,
  group: PaletteGroup.CMYK,
  data: [
    255, 255, 255,
    192, 235, 251,
    128, 214, 247,
    64, 194, 243,
    0, 174, 239,
    251, 192, 227,
    246, 128, 198,
    241, 64, 169,
    236, 0, 140,
    255, 252, 192,
    255, 249, 128,
    255, 245, 64,
    255, 242, 0,
    196, 196, 196,
    136, 136, 136,
    76, 76, 76,
    16, 16, 16
  ]
};

export const CMYK16: Palette = {
  name: '16-color CMYK (4-bit, 1bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.CMYK,
  data: [
    4, 1, 0, 0,
    2, 0, 0, 174, 239,
    2, 0, 236, 0, 160,
    2, 0, 255, 242, 0,
    2, 0, 128, 128, 128
  ]
};

export const CMYK64: Palette = {
  name: '64-color CMYK (6-bit, 1-1-1-3)',
  type: PaletteType.Mixer,
  group: PaletteGroup.CMYK,
  data: [
    4, 1, 0, 0,
    2, 0, 0, 174, 239,
    2, 0, 236, 0, 160,
    2, 0, 255, 242, 0,
    8, 0, 96, 96, 96
  ]
};

export const CMYK256: Palette = {
  name: '256-color CMYK (8-bit, 2bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.CMYK,
  data: [
    4, 1, 0, 0,
    4, 0, 0, 174, 239,
    4, 0, 236, 0, 160,
    4, 0, 255, 242, 0,
    4, 0, 96, 96, 96
  ]
};
