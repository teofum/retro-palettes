import ColorDistanceFn from '../../colorDistance/ColorDistanceFn';
import ColorPalette from '../../palette/ColorPalette';
import { paletteMap } from '../../palette/paletteMap';
import { Process, ProcessFn } from '../Process';

const processFloydSteinberg: ProcessFn = (
  dataIn: ImageData,
  palette: ColorPalette,
  distFn: ColorDistanceFn
) => {
  const size = dataIn.width * dataIn.height * 4;
  const line = dataIn.width * 4;

  for (let i = 0; i < size; i += 4) {
    const color = Array.from(dataIn.data.slice(i, i + 4));
    const mapped: number[] = paletteMap(color, palette, distFn);

    for (let j = 0; j < 3; j++)
      dataIn.data[i + j] = mapped[j];

    const error = color.map((ch, i) => ch - mapped[i]);
    for (let j = 0; j < 3; j++) {
      dataIn.data[i + 4 + j] += error[j] * 7 / 16;
      dataIn.data[i + line - 4 + j] += error[j] * 3 / 16;
      dataIn.data[i + line + j] += error[j] * 5 / 16;
      dataIn.data[i + line + 4 + j] += error[j] * 1 / 16;
    }
  }

  return dataIn;
};

const FloydSteinberg: Process = {
  name: 'Floyd–Steinberg',
  function: processFloydSteinberg
};

export default FloydSteinberg;