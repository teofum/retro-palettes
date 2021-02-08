import ColorPalette from '../ColorPalette';
import PaletteType from '../PaletteGroups';

export const MonoW: ColorPalette = {
  name: 'Black/White (1-bit MC)',
  type: PaletteType.PMono,
  useAlpha: false,
  data: [
    [0, 0, 0],
    [255, 255, 255]
  ]
};

export const MonoG: ColorPalette = {
  name: 'Black/Green (1-bit MC)',
  type: PaletteType.PMono,
  useAlpha: false,
  data: [
    [0, 0, 0],
    [0, 255, 0]
  ]
};

export const MonoA: ColorPalette = {
  name: 'Black/Amber (1-bit MC)',
  type: PaletteType.PMono,
  useAlpha: false,
  data: [
    [0, 0, 0],
    [255, 200, 15]
  ]
};
