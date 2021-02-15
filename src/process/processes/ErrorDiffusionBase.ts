import CompareFn, { colDistLinearL as colDistLinear, colDistRGB } from '../../color/CompareFn';
import { ProcessFeatures } from '../../render/RenderUtils';
import Palette from '../../palette/Palette';
import { paletteMap } from '../../palette/paletteMap';
import PaletteUtils from '../../palette/PaletteUtils';
import { srgb2linear, linear2srgb } from '../../utils/colorUtils';
import { ProcessFn } from '../Process';
import { ProgressFn } from '../ProcessWorker';

export type ErrorDiffusionMatrix = { x: number, y: number, w: number }[];

export function processErrorDiffusion(matrix: ErrorDiffusionMatrix): ProcessFn {
  return (
    dataIn: ImageData,
    palette: Palette,
    distFn: CompareFn,
    features: ProcessFeatures,
    cbProgress: ProgressFn | null
  ) => {
    const size = dataIn.width * dataIn.height * 4;
    const line = dataIn.width * 4;

    const colors = PaletteUtils.getColors(palette);

    if (features.gamma) {
      for (let i = 0; i < size; i += 4) {
        const linear = srgb2linear(Array.from(dataIn.data.slice(i, i + 3)));
        for (let j = 0; j < 3; j++) dataIn.data[i + j] = linear[j];

        if (i % (line * 4) === 0 && cbProgress) cbProgress(i, size, dataIn);
      }

      for (let i = 0; i < colors.length; i++)
        colors[i] = srgb2linear(colors[i]);
    }

    for (let i = 0; i < size; i += 4) {
      const color = Array.from(dataIn.data.slice(i, i + 3));
      const mapped: readonly number[] = paletteMap(color, colors, features.gamma ? colDistLinear : colDistRGB);
      const x = (i % line) / 4;

      for (let j = 0; j < 3; j++)
        dataIn.data[i + j] = (features.gamma ? linear2srgb(mapped) : mapped)[j];

      const error = color.map((ch, i) => ch - mapped[i]);
      for (let k = 0; k < matrix.length; k++) {
        const index = i + matrix[k].x * 4 + matrix[k].y * line;

        // Bounds check, fixes small error at the edges
        if (x + matrix[k].x >= 0 && x + matrix[k].x < dataIn.width) {
          for (let j = 0; j < 3; j++)
            dataIn.data[index + j] += error[j] * matrix[k].w;
        }
      }

      if (i % (4 * line) === 0 && cbProgress) cbProgress(i, size, dataIn);
    }

    return dataIn;
  };
}
