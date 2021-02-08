import ColorPalette from '../ColorPalette';
import PaletteType from '../PaletteGroups';

export const RGB8: ColorPalette = {
  name: '8-color RGB (3-bit, 1bpc)',
  type: PaletteType.PRGB,
  useAlpha: false,
  data: [[1, 1, 1]]
};

export const RGB64: ColorPalette = {
  name: '64-color RGB (6-bit, 2bpc)',
  type: PaletteType.PRGB,
  useAlpha: false,
  data: [[2, 2, 2]]
};

export const RGB256: ColorPalette = {
  name: '256-color RGB (8-bit, 3-3-2)',
  type: PaletteType.PRGB,
  useAlpha: false,
  data: [[3, 3, 2]]
};
