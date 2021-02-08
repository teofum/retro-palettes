import ColorPalette from "../ColorPalette";
import PaletteType from "../PaletteGroups";

const Macintosh4b: ColorPalette = {
  name: 'Macintosh II (1987)',
  type: PaletteType.P4BitIndexed,
  useAlpha: false,
  data: [
    [0xFF, 0xFF, 0xFF], // White
    [0xFF, 0xFF, 0x00], // Yellow
    [0xFF, 0x66, 0x00], // Orange
    [0xDD, 0x00, 0x00], // Red
    [0xFF, 0x00, 0x99], // Magenta
    [0x33, 0x00, 0x99], // Purple
    [0x00, 0x00, 0xCC], // Blue
    [0x00, 0x99, 0xFF], // Cyan
    [0x00, 0xAA, 0x00], // Green
    [0x00, 0x66, 0x00], // Dark Green
    [0x66, 0x33, 0x00], // Brown
    [0x99, 0x66, 0x33], // Tan
    [0xBB, 0xBB, 0xBB], // Light Grey
    [0x88, 0x88, 0x88], // Medium Grey
    [0x44, 0x44, 0x44], // Dark Grey
    [0x00, 0x00, 0x00]  // Black
  ]
};

export default Macintosh4b;