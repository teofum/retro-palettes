import { Process } from '../Process';
import { processErrorDiffusion, ErrorDiffusionMatrix } from './ErrorDiffusionBase';

const edMatrixMinAverageError: ErrorDiffusionMatrix = [
  { x:  1, y: 0, w: 7 / 48 },
  { x:  2, y: 0, w: 5 / 48 },
  { x: -2, y: 1, w: 3 / 48 },
  { x: -1, y: 1, w: 5 / 48 },
  { x:  0, y: 1, w: 7 / 48 },
  { x:  1, y: 1, w: 5 / 48 },
  { x:  2, y: 1, w: 3 / 48 },
  { x: -2, y: 2, w: 1 / 48 },
  { x: -1, y: 2, w: 3 / 48 },
  { x:  0, y: 2, w: 5 / 48 },
  { x:  1, y: 2, w: 3 / 48 },
  { x:  2, y: 2, w: 1 / 48 }
];

const MinAverageError: Process = {
  id: 'ProcMinAverageError',
  name: 'Minimum Average Error (JJ&N)',
  procFn: processErrorDiffusion(edMatrixMinAverageError),

  maxAllowedPaletteSize: 65536,
  supports: {
    threads: false, // Unsupported
    gamma: true
  },
  complexity: (n) => n * 6
};

export default MinAverageError;