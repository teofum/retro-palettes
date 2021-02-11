export function gammaCorrect(color: number[], gamma: number, allowNegative: boolean = false): number[] {
  const correct = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    if (allowNegative) {
      const sign = color[i] < 0 ? -1 : 1;
      correct[i] = sign * Math.pow(color[i] * sign / 255, gamma);
    } else correct[i] = Math.pow(color[i] / 255, gamma);
  }
  return correct;
}

export function gammaUncorrect(color: number[], gamma: number, allowNegative: boolean = false): number[] {
  const ungamma = 1 / gamma;
  const uncorrect = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    if (allowNegative) {
      const sign = color[i] < 0 ? -1 : 1;
      uncorrect[i] = sign * Math.pow(color[i] * sign, ungamma) * 255;
    } else uncorrect[i] = Math.pow(color[i], ungamma) * 255;
  }
  return uncorrect;
}

export function gammaCorrectMC(value: number, gamma: number, allowNegative: boolean = false): number {
  if (allowNegative) {
    const sign = value < 0 ? -1 : 1;
    return sign * Math.pow(value * sign / 255, gamma);
  } else return Math.pow(value / 255, gamma);
}

export function gammaUnorrectMC(value: number, gamma: number, allowNegative: boolean = false): number {
  const ungamma = 1 / gamma;
  if (allowNegative) {
    const sign = value < 0 ? -1 : 1;
    return sign * Math.pow(value * sign, ungamma) * 255;
  } else return Math.pow(value, ungamma) * 255;
}