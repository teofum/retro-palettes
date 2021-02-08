import PaletteType from './PaletteGroups';

export default interface ColorPalette {
  readonly name: string;
  readonly type: PaletteType;
  readonly useAlpha: boolean;
  readonly data: number[][];
// ESLint complains about a missing semicolon in this line... Except it's right there
// eslint-disable-next-line semi
};
