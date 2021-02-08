import ColorPalette from '../ColorPalette';
import PaletteType from '../PaletteGroups';

export const CGAm4p0l: ColorPalette = {
  name: 'CGA Mode 4 Palette 0 (low)',
  type: PaletteType.P2BitIndexed,
  useAlpha: false,
  data: [
    [0x00, 0x00, 0x00], // Black
    [0x00, 0xAA, 0x00], // Green
    [0xAA, 0x00, 0x00], // Red
    [0xAA, 0x55, 0x00]  // Brown
  ]
};

export const CGAm4p0h: ColorPalette = {
  name: 'CGA Mode 4 Palette 0 (high)',
  type: PaletteType.P2BitIndexed,
  useAlpha: false,
  data: [
    [0x00, 0x00, 0x00], // Black
    [0x55, 0xFF, 0x55], // Light Green
    [0xFF, 0x55, 0x55], // Light Red
    [0xFF, 0xFF, 0x55]  // Yellow
  ]
};

export const CGAm4p1l: ColorPalette = {
  name: 'CGA Mode 4 Palette 1 (low)',
  type: PaletteType.P2BitIndexed,
  useAlpha: false,
  data: [
    [0x00, 0x00, 0x00], // Black
    [0x00, 0xAA, 0xAA], // Cyan
    [0xAA, 0x00, 0xAA], // Magenta
    [0xAA, 0xAA, 0xAA]  // Light Grey
  ]
};

export const CGAm4p1h: ColorPalette = {
  name: 'CGA Mode 4 Palette 1 (high)',
  type: PaletteType.P2BitIndexed,
  useAlpha: false,
  data: [
    [0x00, 0x00, 0x00], // Black
    [0x55, 0xFF, 0xFF], // Light Cyan
    [0xFF, 0x55, 0xFF], // Light Magenta
    [0xFF, 0xFF, 0xFF]  // White
  ]
};

export const CGAm5l: ColorPalette = {
  name: 'CGA Mode 5 (low)',
  type: PaletteType.P2BitIndexed,
  useAlpha: false,
  data: [
    [0x00, 0x00, 0x00], // Black
    [0x00, 0xAA, 0xAA], // Cyan
    [0xAA, 0x00, 0x00], // Red
    [0xAA, 0xAA, 0xAA]  // Light Grey
  ]
};

export const CGAm5h: ColorPalette = {
  name: 'CGA Mode 5 (high)',
  type: PaletteType.P2BitIndexed,
  useAlpha: false,
  data: [
    [0x00, 0x00, 0x00], // Black
    [0x55, 0xFF, 0xFF], // Light Cyan
    [0xFF, 0x55, 0x55], // Light Red
    [0xFF, 0xFF, 0xFF]  // White
  ]
};