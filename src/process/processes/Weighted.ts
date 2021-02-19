import CompareFn from '../../color/CompareFn';
import { ProcessFeatures } from '../../render/RenderUtils';
import Palette from '../../palette/Palette';
import PaletteUtils from '../../palette/PaletteUtils';
import { gammaCorrect, gammaUncorrectMC } from '../../utils/gamma';
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

const processColorThreshold: ProcessFn = (
  dataIn: ImageData,
  palette: Palette,
  distFn: CompareFn,
  features: ProcessFeatures,
  cbProgress: ProgressFn | null
) => {
  const size = dataIn.width * dataIn.height * 4;
  const line = dataIn.width * 4;

  const candidates: number[] = [];
  let color: number[], pColor: number[];
  let colorSum: number[], avgWithCandidate: number[];
  const test = [0, 0, 0];

  // Precalculate luminance table and gamma-corrected palette
  const luma = PaletteUtils.getColors(palette)
    .map(color => color[0] * 299 + color[1] * 587 + color[2] * 114);

  const originalColors = PaletteUtils.getColors(palette);
  const colors = PaletteUtils.getColors(
    (features.gamma) ? 
      PaletteUtils.transform(palette, gammaCorrect)
      : palette
  );

  for (let i = 0; i < size; i += 4) {
    color = Array.from(dataIn.data.slice(i, i + 4));
    const x = (i % line) / 4;
    const y = ~~(i / line);

    candidates.splice(0); // Colors that may be used, weighted by repetition
    colorSum = [0, 0, 0]; // Accumulating sum of all candidates, gamma corrected
    while (candidates.length < 16) {
      let candidate = 0; // Candidate to add
      let weight = 1;
      let minError = Number.MAX_VALUE;

      // Max weight for a new candidate increases with number/weight of candidates
      const maxWeight = (candidates.length || 1);

      // Pick best color in palette as new candidate
      for (let p = 0; p < colors.length; p++) {
        pColor = [...colors[p]];
        avgWithCandidate = [...colorSum];

        for (let add = 1; add <= maxWeight; add *= 2) {
          // Sum if the candidate was added with its current weight (gamma -> standard)
          const div = candidates.length + add;
          for (let j = 0; j < 3; j++) {
            avgWithCandidate[j] = colorSum[j] + pColor[j] * add;
            test[j] = avgWithCandidate[j] / div;
            if (features.gamma) test[j] = gammaUncorrectMC(test[j]);
          }

          // Error with this candidate and weight
          const error = distFn(test, color);
          if (error < minError) {
            weight = add;
            candidate = p;
            minError = error;
          }
        }
      }

      for (let j = 0; j < weight; j++) candidates.push(candidate);
      for (let j = 0; j < 3; j++) colorSum[j] += colors[candidate][j] * weight;
    }
    candidates.sort((a, b) => luma[a] - luma[b]);
    const index = ~~(threshold[(x % 8) + (y % 8) * 8] * candidates.length);

    for (let j = 0; j < 3; j++)
      dataIn.data[i + j] = originalColors[candidates[index]][j];

    if (i % (4 * line) === 0 && cbProgress) cbProgress(i, size, dataIn);
  }

  return dataIn;
};

const ColorThresholdMatrix: Process = {
  id: 'ProcColorThresholdMatrix',
  name: 'Color Threshold Matrix',
  procFn: processColorThreshold,

  maxAllowedPaletteSize: 256,
  supports: {
    threads: true,
    gamma: true
  },
  complexity: (n) => (n * 64) // Based on worst case of O(n * 16 * log₂16), actual execution should be much faster
};

export default ColorThresholdMatrix;
