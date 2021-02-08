import { CGAm4p0h, CGAm4p0l, CGAm4p1h, CGAm4p1l, CGAm5h, CGAm5l } from './palette/palettes/CGA2bModes';
import CGA4bRGBI from './palette/palettes/CGA4bRGBI';
import Cmdr644b from './palette/palettes/Cmdr644b';
import Win4bRGBI from './palette/palettes/Win4bRGBI';
import Win20cEx from './palette/palettes/Win20cEx';
import ZX4bRGBI from './palette/palettes/ZX4bRGBI';
import { GameboyG, GameboyW } from './palette/palettes/Gameboy';
import { RGB256, RGB64, RGB8 } from './palette/palettes/RGB';
import { loadFile } from './utils';
import Macintosh4b from './palette/palettes/Macintosh4b';
import { Auto16, Auto256, Auto64 } from './palette/palettes/Auto';
import { MonoA, MonoG, MonoW } from './palette/palettes/Mono';
import DitherStyle from './dithering/DitherStyle';
import { applyPalette } from './palette/applyPalette';

// Initialization

// Get both canvas elements and contexts
const imageCanvas = document.getElementById('canvasOriginal') as HTMLCanvasElement;
const imageContext = imageCanvas.getContext('2d');

const outputCanvas = document.getElementById('canvasOutput') as HTMLCanvasElement;

// Load palette data and get the select element
const palettes = [
  CGAm4p0l,
  CGAm4p0h,
  CGAm4p1l,
  CGAm4p1h,
  CGAm5l,
  CGAm5h,
  Cmdr644b,
  Macintosh4b,
  Win4bRGBI,
  Win20cEx,
  CGA4bRGBI,
  ZX4bRGBI,
  MonoW,
  MonoA,
  MonoG,
  GameboyG,
  GameboyW,
  RGB8,
  RGB64,
  RGB256,
  Auto16,
  Auto64,
  Auto256
];
let selectedPalette = Win4bRGBI;
const paletteSelect = document.getElementById('paletteSelect') as HTMLSelectElement;

// Populate the palette select element
palettes.forEach(palette => {
  const option = document.createElement('option');
  option.setAttribute('value', palette.name);
  option.text = palette.name;

  // Try and find the option group the palette belongs in
  let group: HTMLOptGroupElement | undefined;
  const groups = paletteSelect.getElementsByTagName('optgroup');
  for (let i = 0; i < groups.length; i++)
    if (groups[i].label === palette.type) group = groups[i];

  // If the group doesn't exist, create it
  if (!group) {
    group = document.createElement('optgroup');
    group.label = palette.type;
    paletteSelect.appendChild(group);
  }

  group.appendChild(option);
});
paletteSelect.value = selectedPalette.name;

let ditherStyle = DitherStyle.None;
const ditherSelect = document.getElementById('ditherStyleSelect') as HTMLSelectElement;

// Ugly hacky way to list Enum values since TS provides no built-in for it
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const styles = Object.keys(DitherStyle).map(k => ((DitherStyle as any)[k] as DitherStyle));
styles.forEach(style => {
  const option = document.createElement('option');
  option.setAttribute('value', style);
  option.text = style;

  ditherSelect.appendChild(option);
});

// Add change handlers for settings
paletteSelect.addEventListener('change', function (ev: Event) {
  selectedPalette = palettes.find(p =>
    p.name === (ev.target as HTMLSelectElement).value
  ) || selectedPalette;

  applyPalette(imageCanvas, outputCanvas, selectedPalette, ditherStyle);
});

ditherSelect.addEventListener('change', function (ev: Event) {
  ditherStyle = (ev.target as HTMLSelectElement).value as DitherStyle;
  
  applyPalette(imageCanvas, outputCanvas, selectedPalette, ditherStyle);
});

// Add file upload handling
function onLoad(img: HTMLImageElement): void {
  let w = img.width;
  let h = img.height;

  if (w > 500) {
    h = 500 * (h / w);
    w = 500;
  }

  imageCanvas.width = w;
  imageCanvas.height = h;
  imageContext?.drawImage(img, 0, 0, w, h);
  applyPalette(imageCanvas, outputCanvas, selectedPalette, ditherStyle);
}

const fileInput = document.getElementById('fileInput') as HTMLInputElement;
fileInput.addEventListener('change',
  function (ev: Event) { loadFile(ev).then(img => onLoad(img)); });

// Add click handler for view original button
function toggleViewOriginal() {
  outputCanvas.classList.contains('clip') ?
    outputCanvas.classList.remove('clip') :
    outputCanvas.classList.add('clip');
}

const toggleBtn = document.getElementById('toggleOriginal') as HTMLButtonElement;
toggleBtn.addEventListener('click', toggleViewOriginal);