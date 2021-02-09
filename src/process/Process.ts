import ColorDistanceFn from '../colorDistance/ColorDistanceFn';
import ColorPalette from '../palette/ColorPalette';
import Basic from './processes/Basic';
import { BayerLike, BayerLikeFast } from './processes/BayerLike';
import FloydSteinberg from './processes/FloydSteinberg';
import { ProgressFn } from './ProcessWorker';

export type ProcessFn = (
  dataIn: ImageData,
  palette: ColorPalette,
  distFn: ColorDistanceFn,
  cbProgress: ProgressFn | null
) => ImageData;

export interface Process {
  id: string;
  name: string;
  function: ProcessFn;
}

export const getProcessById = (id: string): Process | null => {
  switch (id) {
    case 'ProcBasic':
      return Basic;
    case 'ProcFloydSteinberg':
      return FloydSteinberg;
    case 'ProcBayerLikeFast':
      return BayerLikeFast;
    case 'ProcBayerLikeThorough':
      return BayerLike;
    default:
      return null;
  }
};
