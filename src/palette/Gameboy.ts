import ColorPalette from "../ColorPalette";
import PaletteType from "../PaletteGroups";

export const GameboyG: ColorPalette = {
  name: 'Game Boy Green (2-bit MC)',
  type: PaletteType.PMono,
  useAlpha: false,
  data: [
    [0x0F, 0x38, 0x0F],
    [0x30, 0x62, 0x30],
    [0x8B, 0xAC, 0x0F],
    [0x9B, 0xBC, 0x0F] 
  ]
};

export const GameboyW: ColorPalette = {
  name: 'Game Boy White (2-bit MC)',
  type: PaletteType.PMono,
  useAlpha: false,
  data: [
    [0x00, 0x00, 0x00],
    [0x55, 0x55, 0x55],
    [0xAA, 0xAA, 0xAA],
    [0xFF, 0xFF, 0xFF] 
  ]
};