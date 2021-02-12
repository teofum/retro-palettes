import Palette from '../Palette';
import PaletteGroup from '../PaletteGroup';
import PaletteType from '../PaletteType';

const CGA4bRGBI: Palette = {
  name: 'CGA 4-bit RGBI (IBM)',
  type: PaletteType.Indexed,
  group: PaletteGroup.RGBI,
  data: [
    0x00, 0x00, 0x00, // Black
    0x00, 0x00, 0xAA, // Blue
    0x00, 0xAA, 0x00, // Green
    0x00, 0xAA, 0xAA, // Cyan
    0xAA, 0x00, 0x00, // Red
    0xAA, 0x00, 0xAA, // Magenta
    0xAA, 0x55, 0x00, // Brown
    0xAA, 0xAA, 0xAA, // Light Grey
    0x55, 0x55, 0x55, // Dark Grey
    0x55, 0x55, 0xFF, // Light Blue
    0x55, 0xFF, 0x55, // Light Green
    0x55, 0xFF, 0xFF, // Light Cyan
    0xFF, 0x55, 0x55, // Light Red
    0xFF, 0x55, 0xFF, // Light Magenta
    0xFF, 0xFF, 0x55, // Yellow
    0xFF, 0xFF, 0xFF  // White
  ]
};

export default CGA4bRGBI;