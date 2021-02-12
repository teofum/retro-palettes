import Palette from '../Palette';
import PaletteGroup from '../PaletteGroup';
import PaletteType from '../PaletteType';

export const GameBoy: Palette = {
  name: 'Game Boy (2-bit MC)',
  type: PaletteType.Indexed,
  group: PaletteGroup.Mono,
  data: [
    0x0F, 0x38, 0x0F,
    0x30, 0x62, 0x30,
    0x8B, 0xAC, 0x0F,
    0x9B, 0xBC, 0x0F 
  ]
};