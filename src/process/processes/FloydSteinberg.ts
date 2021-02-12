import { Process } from '../Process';
import { processErrorDiffusion, ErrorDiffusionMatrix } from './ErrorDiffusionBase';

const edMatrixFloydSteinberg: ErrorDiffusionMatrix = [
  { x:  1, y: 0, w: 7 / 16 },
  { x: -1, y: 1, w: 3 / 16 },
  { x:  0, y: 1, w: 5 / 16 },
  { x:  1, y: 1, w: 1 / 16 }
];

const FloydSteinberg: Process = {
  id: 'ProcFloydSteinberg',
  name: 'Floyd–Steinberg',
  procFn: processErrorDiffusion(edMatrixFloydSteinberg),

  maxAllowedPaletteSize: 65536,
  supports: {
    threads: false, // Unsupported
    gamma: true
  },
  complexity: (n) => n * 2
};

export default FloydSteinberg;