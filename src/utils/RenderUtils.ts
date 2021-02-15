import Palette from '../palette/Palette';
import { Process } from '../process/Process';

export interface ProcessFeatures {
  gamma: boolean;
}

export interface RenderOptions {
  palette: Palette;
  process: Process;
  threads: number | 'auto';
  features: ProcessFeatures;
}

export interface ImagePart {
  data: ImageData;
  x: number;
  y: number;
}
