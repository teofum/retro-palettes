import Palette from '../Palette';
import PaletteGroup from '../PaletteGroup';
import PaletteType from '../PaletteType';

export const Auto16: Palette = {
  name: 'Auto 16-color (4-bit indexed)',
  type: PaletteType.Auto,
  group: PaletteGroup.Auto,
  data: [16, -1, 4, 1]
};

export const Auto64: Palette = {
  name: 'Auto 64-color (6-bit indexed)',
  type: PaletteType.Auto,
  group: PaletteGroup.Auto,
  data: [64, 1, 5, 1]
};

export const Auto256: Palette = {
  name: 'Auto 256-color (8-bit indexed)',
  type: PaletteType.Auto,
  group: PaletteGroup.Auto,
  data: [256, 2, 5, 1]
};
