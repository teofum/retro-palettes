import Palette from '../Palette';
import PaletteGroup from '../PaletteGroup';
import PaletteType from '../PaletteType';

const CMYK: Palette = {
  name: 'CMYK',
  type: PaletteType.Indexed,
  group: PaletteGroup.Other,
  data: [
    0x00, 0x00, 0x00, // Black
    0x00, 0xFF, 0xFF, // Cyan
    0xFF, 0x00, 0xFF, // Magenta
    0xFF, 0xFF, 0x00, // Yellow
    0xFF, 0xFF, 0xFF  // White
  ]
};

export default CMYK;