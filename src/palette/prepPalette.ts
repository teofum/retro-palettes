import { Process } from '../process/Process';
import { getAutoPalette } from './AutoPalette';
import Palette from './Palette';
import PaletteType from './PaletteType';

// Handles any palette transformations usually done
// by any given process, so they may be done in the
// main thread.
export default function prepPalette(
  palette: Palette,
  process: Process,
  image: ImageData
): Palette {
  if (palette.type === PaletteType.Auto)
    return getAutoPalette({
      size: palette.data[0],
      reservedLevel: palette.data[1],
      levels: palette.data[2],
      thresholdCoeff: palette.data[3]
    }, image);

  return palette;
}
