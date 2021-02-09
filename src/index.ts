import { CGAm4p0h, CGAm4p0l, CGAm4p1h, CGAm4p1l, CGAm5h, CGAm5l } from './palette/palettes/CGA2bModes';
import CGA4bRGBI from './palette/palettes/CGA4bRGBI';
import Cmdr644b from './palette/palettes/Cmdr644b';
import Win4bRGBI from './palette/palettes/Win4bRGBI';
import Win20cEx from './palette/palettes/Win20cEx';
import ZX4bRGBI from './palette/palettes/ZX4bRGBI';
import { GameboyG, GameboyW } from './palette/palettes/Gameboy';
import { RGB256, RGB64, RGB8 } from './palette/palettes/RGB';
import { loadFile } from './utils/utils';
import Macintosh4b from './palette/palettes/Macintosh4b';
import { Auto16, Auto256, Auto64 } from './palette/palettes/Auto';
import { MonoA, MonoG, MonoW } from './palette/palettes/Mono';
import { applyPaletteAsync } from './palette/applyPalette';
import Basic from './process/processes/Basic';
import FloydSteinberg from './process/processes/FloydSteinberg';
import { clearPaletteCache } from './paletteGen/getAutoPalette';
import { colDistLab, colDistRGB } from './colorDistance/ColorDistanceFn';
import { BayerLike, BayerLikeFast } from './process/processes/BayerLike';
import ProcessWorker from './process/ProcessWorker';

// Initialization

// Get both canvas elements and contexts
const imageCanvas = document.getElementById('canvasOriginal') as HTMLCanvasElement;
const imageContext = imageCanvas.getContext('2d');

const outputCanvas = document.getElementById('canvasOutput') as HTMLCanvasElement;
const outputContext = outputCanvas.getContext('2d');

// Create process worker
const procWorker = new ProcessWorker();
procWorker.onfinish = (result: ImageData) => outputContext?.putImageData(result, 0, 0);
procWorker.onprogress = (prog: { current: number, total: number, partial?: ImageData }) => {
  const processed = prog.current / 4 / imageCanvas.width;
  const total = prog.total / 4 / imageCanvas.width;
  console.log(`Processed ${processed}/${total} lines`);

  if (prog.partial) outputContext?.putImageData(prog.partial, 0, 0);
};

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

// Load processes and get the select element
const processes = [
  Basic,
  FloydSteinberg,
  BayerLikeFast,
  BayerLike
];
let selectedProcess = Basic;
const procSelect = document.getElementById('processSelect') as HTMLSelectElement;

// Populate the process select element
processes.forEach(process => {
  const option = document.createElement('option');
  option.setAttribute('value', process.name);
  option.text = process.name;

  procSelect.appendChild(option);
});

const labCheckbox = document.getElementById('useLab') as HTMLInputElement;
labCheckbox.addEventListener('change', function () { update(); });

// Add change handlers for settings
paletteSelect.addEventListener('change', function (ev: Event) {
  selectedPalette = palettes.find(pal =>
    pal.name === (ev.target as HTMLSelectElement).value
  ) || selectedPalette;

  update();
});

procSelect.addEventListener('change', function (ev: Event) {
  selectedProcess = processes.find(proc =>
    proc.name === (ev.target as HTMLSelectElement).value
  ) || selectedProcess;

  update();
});

// Add file upload handling
const resizeInput = document.getElementById('resizeInput') as HTMLInputElement;
function onLoad(img: HTMLImageElement): void {
  let w = img.width;
  let h = img.height;

  const maxSize = parseInt(resizeInput.value, 10);
  if (w >= h && w > maxSize) {
    h = maxSize * (h / w);
    w = maxSize;
  }
  if (h > w && h > maxSize) {
    w = maxSize * (w / h);
    h = maxSize;
  }

  imageCanvas.width = w;
  imageCanvas.height = h;
  imageContext?.drawImage(img, 0, 0, w, h);

  // Clear the cache of generated palettes
  clearPaletteCache();
  update();
}

const fileInput = document.getElementById('fileInput') as HTMLInputElement;
fileInput.addEventListener('change',
  function (ev: Event) { loadFile(ev).then(img => onLoad(img)); });

// Define update function
function update(): void {
  if (!procWorker.ready) return;

  applyPaletteAsync(
    imageCanvas, outputCanvas,
    selectedPalette,
    selectedProcess,
    labCheckbox.checked ? 'cdLab' : 'cdRGB',
    procWorker);
}

// Add click handler for view original button
function toggleViewOriginal() {
  outputCanvas.classList.contains('clip') ?
    outputCanvas.classList.remove('clip') :
    outputCanvas.classList.add('clip');
}

const toggleBtn = document.getElementById('toggleOriginal') as HTMLButtonElement;
toggleBtn.addEventListener('click', toggleViewOriginal);
