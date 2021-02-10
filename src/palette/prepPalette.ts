import { getAutoPalette } from '../paletteGen/getAutoPalette';
import { Process } from '../process/Process';
import { expandRGBPalette } from '../utils/utils';
import ColorPalette from './ColorPalette';
import PaletteType from './PaletteGroups';

// Handles any palette transformations usually done
// by any given process, so they may be done in the
// main thread.
export default function prepPalette(
  palette: ColorPalette,
  process: Process,
  image: ImageData
): ColorPalette {
  if (palette.type === PaletteType.PAuto)
    return getAutoPalette(palette, image);
  
  if (process.name.includes('Ordered') && palette.type === PaletteType.PRGB)
    return expandRGBPalette(palette);

  return palette;
}
