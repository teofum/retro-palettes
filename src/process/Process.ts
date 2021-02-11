import ColorDistanceFn from '../colorDistance/ColorDistanceFn';
import { ProcessFeatures } from '../palette/applyPalette';
import ColorPalette from '../palette/ColorPalette';
import Basic from './processes/Basic';
import { BayerLike, BayerLikeFast } from './processes/BayerLike';
import FloydSteinberg from './processes/FloydSteinberg';
import WeightedColorMap from './processes/Weighted';
import { ProgressFn } from './ProcessWorker';

export type FeatureSupport = { [feature: string]: boolean };

export type ProcessFn = (
  dataIn: ImageData,
  palette: ColorPalette,
  distFn: ColorDistanceFn,
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
    case BayerLikeFast.id:
      return BayerLikeFast;
    case BayerLike.id:
      return BayerLike;
    case WeightedColorMap.id:
      return WeightedColorMap;
    default:
      return null;
  }
};
