import ColorDistanceFn from '../colorCompare/ColorCompareFn';
import ColorPalette from '../palette/ColorPalette';

export type ProcessFn = (
  dataIn: ImageData,
  palette: ColorPalette,
  distFn: ColorDistanceFn
) => ImageData;

export interface Process {
  name: string;
  function: ProcessFn;
}
