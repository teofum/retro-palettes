import Palette from '../Palette';
import PaletteGroup from '../PaletteGroup';
import PaletteType from '../PaletteType';

export const DuoRC1: Palette = {
  name: 'Dual Tone R/C (2-bit, 1bpc)',
  type: PaletteType.DualTone,
  group: PaletteGroup.Duo,
  data: [
    2, 2, 0, 0,
    255, 0, 0,
    0, 255, 255
  ]
};

export const DuoRC2: Palette = {
  name: 'Dual Tone R/C (4-bit, 2bpc)',
  type: PaletteType.DualTone,
  group: PaletteGroup.Duo,
  data: [
    4, 4, 0, 0,
    255, 0, 0,
    0, 255, 255
  ]
};

export const DuoGM2: Palette = {
  name: 'Dual Tone G/M (4-bit, 2bpc)',
  type: PaletteType.DualTone,
  group: PaletteGroup.Duo,
  data: [
    4, 4, 0, 0,
    0, 255, 0,
    255, 0, 255
  ]
};

export const DuoBY2: Palette = {
  name: 'Dual Tone B/Y (4-bit, 2bpc)',
  type: PaletteType.DualTone,
  group: PaletteGroup.Duo,
  data: [
    4, 4, 0, 0,
    0, 0, 255,
    255, 255, 0
  ]
};

export const DuoWA2: Palette = {
  name: 'Dual Tone W/A (4-bit, 2bpc)',
  type: PaletteType.DualTone,
  group: PaletteGroup.Duo,
  data: [
    4, 4, 0, 0,
    255, 255, 255,
    255, 200, 15
  ]
};

export const DuoOG2: Palette = {
  name: 'Dual Tone O/G (4-bit, 2bpc)',
  type: PaletteType.DualTone,
  group: PaletteGroup.Duo,
  data: [
    4, 4, 0, 0,
    240, 110, 50,
    20, 75, 65
  ]
};