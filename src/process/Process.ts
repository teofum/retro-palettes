import CompareFn from '../color/CompareFn';
import { ProcessFeatures } from '../utils/RenderUtils';
import Palette from '../palette/Palette';
import Basic from './processes/Basic';
import { BayerLike, BayerLikeFast } from './processes/BayerLike';
import FloydSteinberg from './processes/FloydSteinberg';
import MinAverageError from './processes/MinAverageError';
import ColorThresholdMatrix from './processes/Weighted';
import { ProgressFn } from './ProcessWorker';

export type FeatureSupport = { [feature: string]: boolean };

export type ProcessFn = (
  dataIn: ImageData,
  palette: Palette,
  distFn: CompareFn,
  features: ProcessFeatures,
  cbProgress: ProgressFn | null
) => ImageData;

export interface Process {
  id: string;
  name: string;
  procFn: ProcessFn;

  maxAllowedPaletteSize: number;
  supports: FeatureSupport;

  // Process complexity O(n) per pixel, referring to the
  // number of color comparisons made in the worst case
  // where n is the number of colors in the palette
  // Used to determine thread count in auto mode
  complexity: (n: number) => number;
}

export const getProcessById = (id: string): Process | null => {
  switch (id) {
    case Basic.id:
      return Basic;
    case FloydSteinberg.id:
      return FloydSteinberg;
    case MinAverageError.id:
      return MinAverageError;
    case BayerLikeFast.id:
      return BayerLikeFast;
    case BayerLike.id:
      return BayerLike;
    case ColorThresholdMatrix.id:
      return ColorThresholdMatrix;
    default:
      return null;
  }
};
