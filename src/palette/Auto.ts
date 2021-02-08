import ColorPalette from "../ColorPalette";
import PaletteType from "../PaletteGroups";

export const Auto16: ColorPalette = {
  name: 'Auto 16-color (4-bit indexed)',
  type: PaletteType.PAuto,
  useAlpha: false,
  data: [
    [16, -1, 4],
    [1, 0, 0]
  ]
};

export const Auto64: ColorPalette = {
  name: 'Auto 64-color (6-bit indexed)',
  type: PaletteType.PAuto,
  useAlpha: false,
  data: [
    [64, 1, 5],
    [1, 0, 0]
  ]
};

export const Auto256: ColorPalette = {
  name: 'Auto 256-color (8-bit indexed)',
  type: PaletteType.PAuto,
  useAlpha: false,
  data: [
    [256, 2, 5],
    [1, 0, 0]
  ]
};
