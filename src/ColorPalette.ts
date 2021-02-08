import PaletteType from "./PaletteGroups";

export default interface ColorPalette {
  readonly name: string;
  readonly type: PaletteType;
  readonly useAlpha: boolean;
  readonly data: number[][];
};
