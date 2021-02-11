import CompareFn, { colDistLinearL, colDistRGB } from '../../colorDistance/CompareFn';
import { ProcessFeatures } from '../../palette/applyPalette';
import ColorPalette from '../../palette/ColorPalette';
import PaletteType from '../../palette/PaletteGroups';
import { paletteMap } from '../../palette/paletteMap';
import { linear2srgb, srgb2linear } from '../../utils/colorUtils';
import { Process, ProcessFn } from '../Process';
import { ProgressFn } from '../ProcessWorker';

const processFloydSteinberg: ProcessFn = (
  dataIn: ImageData,
  palette: ColorPalette,
  distFn: CompareFn,
  features: ProcessFeatures,
  cbProgress: ProgressFn | null
) => {
  const size = dataIn.width * dataIn.height * 4;
  const line = dataIn.width * 4;

  if (features.gamma) {
    for (let i = 0; i < size; i += 4) {
      const linear = srgb2linear(Array.from(dataIn.data.slice(i, i + 3)));
      for (let j = 0; j < 3; j++) dataIn.data[i + j] = linear[j];
    }

    palette = {
      name: 'GENERATED_LINEAR',
      type: PaletteType.POther,
      useAlpha: false,
      data: palette.data.map(color => srgb2linear(color))
    };
  }

  for (let i = 0; i < size; i += 4) {
    const color = Array.from(dataIn.data.slice(i, i + 3));
    const mapped: number[] = paletteMap(color, palette, features.gamma ? colDistLinearL : colDistRGB);

    for (let j = 0; j < 3; j++)
      dataIn.data[i + j] = (features.gamma ? linear2srgb(mapped) : mapped)[j];

    const error = color.map((ch, i) => ch - mapped[i]);
    for (let j = 0; j < 3; j++) {
      dataIn.data[i + 4 + j] += error[j] * 7 / 16;
      dataIn.data[i + line - 4 + j] += error[j] * 3 / 16;
      dataIn.data[i + line + j] += error[j] * 5 / 16;
      dataIn.data[i + line + 4 + j] += error[j] * 1 / 16;
    }

    if (i % (4 * line) === 0 && cbProgress) cbProgress(i, size, dataIn);
  }

  return dataIn;
};

const FloydSteinberg: Process = {
  id: 'ProcFloydSteinberg',
  name: 'Floyd–Steinberg',
  procFn: processFloydSteinberg,

  maxAllowedPaletteSize: 65536,
  supports: {
    threads: false, // Unsupported
    gamma: true
  },
  complexity: (n) => n
};

export default FloydSteinberg;