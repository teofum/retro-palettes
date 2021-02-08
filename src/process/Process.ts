import ColorPalette from '../palette/ColorPalette';

export type ProcessFn = (
  dataIn: ImageData,
  palette: ColorPalette
) => ImageData;

export interface Process {
  name: string;
  function: ProcessFn;
}
