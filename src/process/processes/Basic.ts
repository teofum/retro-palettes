import CompareFn from '../../colorDistance/CompareFn';
import { ProcessFeatures } from '../../palette/applyPalette';
import ColorPalette from '../../palette/ColorPalette';
import { paletteMap } from '../../palette/paletteMap';
import { Process, ProcessFn } from '../Process';
import { ProgressFn } from '../ProcessWorker';

const processBasic: ProcessFn = (
  dataIn: ImageData,
  palette: ColorPalette,
  distFn: CompareFn,
  features: ProcessFeatures,
  cbProgress: ProgressFn | null
) => {
  const line = dataIn.width * 4;
  const size = dataIn.width * dataIn.height * 4;
  for (let i = 0; i < size; i += 4) {
    const color = Array.from(dataIn.data.slice(i, i + 4));
    const mapped: number[] = paletteMap(color, palette, distFn);

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