import CompareFn from '../../color/CompareFn';
import { ProcessFeatures } from '../../render/RenderUtils';
import Palette from '../../palette/Palette';
import { paletteMap } from '../../palette/paletteMap';
import PaletteUtils from '../../palette/PaletteUtils';
import { Process, ProcessFn } from '../Process';
import { ProgressFn } from '../ProcessWorker';

const processBasic: ProcessFn = (
  dataIn: ImageData,
  palette: Palette,
  distFn: CompareFn,
  features: ProcessFeatures,
  cbProgress: ProgressFn | null
) => {
  const line = dataIn.width * 4;
  const size = dataIn.width * dataIn.height * 4;
  const colors = PaletteUtils.getColors(palette);
  
  for (let i = 0; i < size; i += 4) {
    const color = Array.from(dataIn.data.slice(i, i + 4));
    const mapped: readonly number[] = paletteMap(color, colors, distFn);

    for (let j = 0; j < 3; j++)
      dataIn.data[i + j] = mapped[j];

    if (i % (8 * line) === 0 && cbProgress) cbProgress(i, size, dataIn); 
  }

  return dataIn;
};

const Basic: Process = {
  id: 'ProcBasic',
  name: 'Basic (no dithering)',
  procFn: processBasic,
  
  maxAllowedPaletteSize: 65536,
  supports: {
    threads: false, // Doesn't need them
    gamma: false // Unsupported
  },
  complexity: (n) => n
};

export default Basic;