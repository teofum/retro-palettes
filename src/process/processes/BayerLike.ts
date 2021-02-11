import ColorDistanceFn from '../../colorDistance/ColorDistanceFn';
import { ProcessFeatures } from '../../palette/applyPalette';
import ColorPalette from '../../palette/ColorPalette';
import PaletteType from '../../palette/PaletteGroups';
import { expandRGBPalette } from '../../utils/utils';
import { Process, ProcessFn } from '../Process';
import { ProgressFn } from '../ProcessWorker';

// 8x8 threshold map
const threshold = [
  0, 48, 12, 60, 3, 51, 15, 63,
  32, 16, 44, 28, 35, 19, 47, 31,
  8, 56, 4, 52, 11, 59, 7, 55,
  40, 24, 36, 20, 43, 27, 39, 23,
  2, 50, 14, 62, 1, 49, 13, 61,
  34, 18, 46, 30, 33, 17, 45, 29,
  10, 58, 6, 54, 9, 57, 5, 53,
  42, 26, 38, 22, 41, 25, 37, 21
].map(v => v / 64.0);

// Defines a potential mix of colors
interface ColorMix {
  color1: number[];
  color2: number[];
  ratio: number; // Mix ratio between the colors, [0-1) in increments of 1/64
}

// Weight function that determines the error for a given color mix
// and target color, penalizing mixes where the components differ
// too much
function evalMixError(
  target: number[], mix: number[], compDist: number,
  rmh: number, distFn: ColorDistanceFn
): number {
  return distFn(target, mix) + compDist * ((rmh < 0 ? -rmh : rmh) + 0.5);
}

function processBayer(fast: boolean = true): ProcessFn {
  return (
    dataIn: ImageData,
    palette: ColorPalette,
    distFn: ColorDistanceFn,
    features: ProcessFeatures,
    cbProgress: ProgressFn | null
  ) => {
    // Expand an RGB palette into a fixed-color palette
    // in order for the algorithm to work
    if (palette.type === PaletteType.PRGB)
      palette = expandRGBPalette(palette);

    const size = dataIn.width * dataIn.height * 4;
    const line = dataIn.width * 4;

    // Pre-calculate (weighted) distance between all permutations of two colors
    // in the given palette, this saves us a few million distance calculations
    const paletteDistances: { [key: number]: number } = {};
    for (let i1 = 0; i1 < palette.data.length; i1++)
      for (let i2 = i1; i2 < palette.data.length; i2++) {
        const index = i1 * palette.data.length + i2; // A unique index
        paletteDistances[index] = distFn(palette.data[i1], palette.data[i2]) * 0.1;
      }

    // Declare all heap-allocated variables to prevent unnecessary garbage collection
    const mix = [0, 0, 0];
    let color: number[], cl1: number[], cl2: number[];
    let bestMix: ColorMix;

    for (let i = 0; i < size; i += 4) {
      color = Array.from(dataIn.data.slice(i, i + 4));
      const x = (i % line) / 4;
      const y = ~~(i / line);
      const mapValue = threshold[(x % 8) + (y % 8) * 8];

      bestMix = { color1: [0, 0, 0], color2: color, ratio: 0.33 };
      let minError = Number.MAX_VALUE;

      for (let i1 = 0; i1 < palette.data.length; i1++)
        for (let i2 = i1; i2 < palette.data.length; i2++) {
          cl1 = palette.data[i1];
          cl2 = palette.data[i2];

          if (fast) {
            // Fast approximation of the 'proper' algorithm
            let ratio = 32;
            if (i1 !== i2) {
              ratio = ((cl1[0] !== cl2[0] ? 299 * 64 * (color[0] - cl1[0]) / (cl2[0] - cl1[0]) : 0)
                + (cl1[1] !== cl2[1] ? 587 * 64 * (color[1] - cl1[1]) / (cl2[1] - cl1[1]) : 0)
                + (cl1[2] !== cl2[2] ? 114 * 64 * (color[2] - cl1[2]) / (cl2[2] - cl1[2]) : 0))
                / ((cl1[0] !== cl2[0] ? 299 : 0) + (cl1[1] !== cl2[1] ? 587 : 0) + (cl1[2] !== cl2[2] ? 114 : 0));
              if (ratio < 0) ratio = 0;
              else if (ratio > 63) ratio = 63;
              ratio = ~~ratio; // Fast floor (to integer)
            }
            const r64 = ratio / 64;
            for (let j = 0; j < 3; j++) mix[j] = cl1[j] + r64 * (cl2[j] - cl1[j]);

            // Get the distance between components we calculated earlier
            const dist = paletteDistances[i1 * palette.data.length + i2];
            const error = evalMixError(color, mix, dist, r64 - 0.5, distFn);
            if (error < minError) {
              minError = error;
              bestMix.color1 = cl1;
              bestMix.color2 = cl2;
              bestMix.ratio = r64;
            }
          } else {
            // Slow version using the more thorough iterative algorithm
            // This looks somewhat better, but is *much* slower
            for (let ratio = 0; ratio < 64; ratio++) {
              if (i1 === i2 && ratio > 0) break;
              const r64 = ratio / 64;
              for (let j = 0; j < 3; j++) mix[j] = cl1[j] + r64 * (cl2[j] - cl1[j]);

              // Get the distance between components we calculated earlier
              const dist = paletteDistances[i1 * palette.data.length + i2];
              const error = evalMixError(color, mix, dist, r64 - 0.5, distFn);
              if (error < minError) {
                minError = error;
                bestMix.color1 = cl1;
                bestMix.color2 = cl2;
                bestMix.ratio = r64;
              }
            }
          }
        }
      for (let j = 0; j < 3; j++)
        dataIn.data[i + j] = mapValue < bestMix.ratio ?
          bestMix.color2[j] :
          bestMix.color1[j];

      if (i % (line * 4) === 0 && cbProgress) cbProgress(i, size, dataIn);
    }

    return dataIn;
  };
}

export const BayerLikeFast: Process = {
  id: 'ProcBayerLikeFast',
  name: 'Ordered (Bayer-like) – Fast',
  procFn: processBayer(),
  
  maxAllowedPaletteSize: 192,
  supports: {
    threads: true,
    gamma: false // Not implemented
  },
  complexity: (n) => (n * n / 2) // O(n²/2)
};

export const BayerLike: Process = {
  id: 'ProcBayerLikeThorough',
  name: 'Ordered (Bayer-like) – High Quality',
  procFn: processBayer(false),
  
  maxAllowedPaletteSize: 24,
  supports: {
    threads: true,
    gamma: false // Not implemented
  },
  complexity: (n) => (n * n * 32) // O(n²/2 * 64)
};
