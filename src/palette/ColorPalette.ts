import PaletteType from './PaletteGroups';

export default interface ColorPalette {
  readonly name: string;
  readonly type: PaletteType;
  readonly useAlpha: boolean;
  readonly data: number[][];
// ESLint complains about a missing semicolon in this line... Except it's right there
// eslint-disable-next-line semi
};

export function paletteSize(pal: ColorPalette): number {
  switch(pal.type) {
    case PaletteType.PRGB:
      return Math.pow(2, pal.data[0][0]) * Math.pow(2, pal.data[0][1]) * Math.pow(2, pal.data[0][2]);
    case PaletteType.PAuto:
      return pal.data[0][0];
    default:
      return pal.data.length;
  }
}