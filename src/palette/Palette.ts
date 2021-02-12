import PaletteGroup from './PaletteGroup';
import PaletteType from './PaletteType';

interface Palette {
  readonly name: string;
  readonly type: PaletteType;
  readonly group: PaletteGroup;
  readonly data: number[];
}

export default Palette;