import Palette from '../Palette';
import PaletteGroup from '../PaletteGroup';
import PaletteType from '../PaletteType';

export const Custom: Palette = {
  name: 'Custom Palette 1',
  type: PaletteType.Indexed,
  group: PaletteGroup.User,
  data: [
    0, 0, 0,
    255, 255, 255
  ]
};