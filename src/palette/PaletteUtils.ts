import ColorTransform from '../color/ColorTransform';
import Palette from './Palette';
import PaletteGroup from './PaletteGroup';
import PaletteType from './PaletteType';

class PaletteUtils {
  public static getSize(palette: Palette): number {
    switch (palette.type) {
      case PaletteType.Indexed:
        return palette.data.length / 3;
      case PaletteType.Mono:
        return palette.data[0];
      case PaletteType.RGB:
        return palette.data[0] * palette.data[1] * palette.data[2];
      case PaletteType.Auto:
      default:
        return 0;
    }
  }

  public static getColor(palette: Palette, i: number): readonly number[] {
    if (i < 0 || i >= this.getSize(palette)) throw new Error(`Color index ${i} out of bounds`);

    switch (palette.type) {
      case PaletteType.Indexed:
        return palette.data.slice(i * 3, i * 3 + 3);
      case PaletteType.Mono:
        return palette.data.slice(1, 4).map(vMax => {
          const vMin = vMax * palette.data[4];
          const vRange = vMax - vMin;
          return vMin + i * ~~(vRange / (palette.data[0] - 1));
        });
      case PaletteType.RGB: {
        const b = i % palette.data[2];
        const g = ~~(i / palette.data[2]) % palette.data[1];
        const r = ~~(i / (palette.data[2] * palette.data[1]));

        return [r, g, b].map((level, i) => level * ~~(255 / (palette.data[i] - 1)));
      }
      case PaletteType.Auto:
      default:
        throw new Error('Invalid or Auto palette type');
    }
  }

  public static getColors(palette: Palette): readonly (readonly number[])[] {
    return Array.from(
      { length: this.getSize(palette) },
      (_, i) => this.getColor(palette, i)
    );
  }

  public static transform(palette: Palette, transform: ColorTransform): Palette {
    const colors = this.getColors(palette).map(color => transform(color));
    console.log(colors);
    return {
      name: `${palette.name} :: ${transform.name}`,
      type: PaletteType.Indexed,
      group: PaletteGroup.Generated,
      data: colors.reduce((flat, color) => flat.concat(color))
    };
  }
}

export default PaletteUtils;
