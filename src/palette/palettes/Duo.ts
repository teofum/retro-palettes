import Palette from '../Palette';
import PaletteGroup from '../PaletteGroup';
import PaletteType from '../PaletteType';

export const DuoGM1: Palette = {
  name: 'Green/Magenta (2-bit, 1bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.Duo,
  data: [
    2, 0, 0, 0,
    2, 0, 0, 255, 0,
    2, 0, 255, 0, 255
  ]
};

export const DuoRC2: Palette = {
  name: 'Red/Cyan (4-bit, 2bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.Duo,
  data: [
    2, 0, 0, 0,
    4, 0, 255, 0, 0,
    4, 0, 0, 255, 255
  ]
};

export const DuoGM2: Palette = {
  name: 'Green/Magenta (4-bit, 2bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.Duo,
  data: [
    2, 0, 0, 0,
    4, 0, 0, 255, 0,
    4, 0, 255, 0, 255
  ]
};

export const DuoBY2: Palette = {
  name: 'Blue/Yellow (4-bit, 2bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.Duo,
  data: [
    2, 0, 0, 0,
    4, 0, 0, 0, 255,
    4, 0, 255, 255, 0
  ]
};

export const DuoWA2: Palette = {
  name: 'White/Amber (4-bit, 2bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.Duo,
  data: [
    2, 0, 0, 0,
    4, 0, 255, 255, 255,
    4, 0, 255, 200, 15
  ]
};

export const DuoOG2: Palette = {
  name: 'Orange/Dark Green (4-bit, 2bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.Duo,
  data: [
    2, 0, 0, 0,
    4, 0, 240, 110, 50,
    4, 0, 20, 75, 65
  ]
};

export const DuoOB2: Palette = {
  name: 'Orange/Blue (4-bit, 2bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.Duo,
  data: [
    2, 0, 0, 0,
    4, 0, 240, 110, 50,
    4, 0, 15, 45, 135
  ]
};

export const DuoCM2: Palette = {
  name: 'Cyan/Magenta (4-bit, 2bpc)',
  type: PaletteType.Mixer,
  group: PaletteGroup.Duo,
  data: [
    2, 0, 0, 0,
    4, 0, 0, 186, 255,
    4, 0, 255, 0, 151
  ]
};