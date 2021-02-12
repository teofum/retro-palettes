// Palettes
import { CGAm4p0h, CGAm4p0l, CGAm4p1h, CGAm4p1l, CGAm5h, CGAm5l } from './palette/palettes/CGA2bModes';
import CGA4bRGBI from './palette/palettes/CGA4bRGBI';
import Cmdr644b from './palette/palettes/Cmdr644b';
import Macintosh4b from './palette/palettes/Macintosh4b';
import Win4bRGBI from './palette/palettes/Win4bRGBI';
import Win20cEx from './palette/palettes/Win20cEx';
import ZX4bRGBI from './palette/palettes/ZX4bRGBI';
import { GameBoy } from './palette/palettes/Gameboy';
import { RGB16, RGB256, RGB64, RGB8 } from './palette/palettes/RGB';
import { Mono2A, Mono2G, Mono2W, Mono4A, Mono4W, Mono16, PipBoy } from './palette/palettes/Mono';
import { DuoBY2, DuoGM2, DuoOG2, DuoGM1, DuoRC2, DuoWA2, DuoOB2 } from './palette/palettes/Duo';
import { CMYK16, CMYK64, CMYK256, CMYKU1, CMYKU2, CMYKU4 } from './palette/palettes/CMYK';
import { Auto16, Auto256, Auto64 } from './palette/palettes/Auto';

// Processes
import Basic from './process/processes/Basic';
import FloydSteinberg from './process/processes/FloydSteinberg';
import { BayerLike, BayerLikeFast } from './process/processes/BayerLike';
import WeightedColorMap from './process/processes/Weighted';

// Utils and functions
import { processImageAsync, terminateAllWorkers, threadsAvailable } from './palette/applyPalette';
import { clearPaletteCache } from './palette/AutoPalette';
import { loadFile } from './utils/utils';
import PaletteUtils from './palette/PaletteUtils';

// ================================================================================================ \\
// Initialization ================================================================================== \\

// Get both canvas elements and contexts
const imageCanvas = document.getElementById('canvasOriginal') as HTMLCanvasElement;
const outputCanvas = document.getElementById('canvasOutput') as HTMLCanvasElement;

// Basic options
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const resizeInput = document.getElementById('resizeInput') as HTMLInputElement;
const paletteSelect = document.getElementById('paletteSelect') as HTMLSelectElement;
const procSelect = document.getElementById('processSelect') as HTMLSelectElement;

// Advanced options
const advancedOptDiv = document.getElementById('advancedOptions') as HTMLElement;
const featGamma = document.getElementById('featGamma') as HTMLInputElement;
const allowSlow = document.getElementById('allowSlow') as HTMLInputElement;
const featThreads = document.getElementById('featThreads') as HTMLInputElement;
const autoThreads = document.getElementById('threadModeAuto') as HTMLInputElement;
const manualThreads = document.getElementById('threadModeManual') as HTMLInputElement;
const threadCount = document.getElementById('threadCount') as HTMLInputElement;

// Buttons and warning banner
const toggleAdvanced = document.getElementById('toggleAdvanced') as HTMLButtonElement;
const toggleOriginal = document.getElementById('toggleOriginal') as HTMLButtonElement;
const startStop = document.getElementById('startStop') as HTMLButtonElement;
const slowWarning = document.getElementById('slowWarning') as HTMLElement;

// TODO: clean this up
const imageContext = imageCanvas.getContext('2d');

allowSlow.addEventListener('change', function () {
  allowSlow.checked ?
    slowWarning.style.removeProperty('display') :
    slowWarning.style.setProperty('display', 'none');

  updateEnabledProcs();
  updateEnabledPalettes();
});

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
  Mono2W,
  Mono2G,
  Mono2A,
  Mono4W,
  Mono4A,
  Mono16,
  GameBoy,
  PipBoy,
  DuoGM1,
  DuoRC2,
  DuoGM2,
  DuoBY2,
  DuoWA2,
  DuoOG2,
  DuoOB2,
  RGB8,
  RGB16,
  RGB64,
  RGB256,
  Auto16,
  Auto64,
  Auto256,
  CMYKU1,
  CMYKU2,
  CMYKU4,
  CMYK16,
  CMYK64,
  CMYK256
];
let selectedPalette = Win4bRGBI;

// Populate the palette select element
palettes.forEach(palette => {
  const option = document.createElement('option');
  option.setAttribute('value', palette.name);
  option.text = palette.name;

  // Try and find the option group the palette belongs in
  let group: HTMLOptGroupElement | undefined;
  const groups = paletteSelect.getElementsByTagName('optgroup');
  for (let i = 0; i < groups.length; i++)
    if (groups[i].label === palette.group) group = groups[i];

  // If the group doesn't exist, create it
  if (!group) {
    group = document.createElement('optgroup');
    group.label = palette.group;
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
  BayerLike,
  WeightedColorMap
];
let selectedProcess = Basic;

// Populate the process select element
processes.forEach(process => {
  const option = document.createElement('option');
  option.setAttribute('value', process.name);
  option.text = process.name;

  procSelect.appendChild(option);
});

// Add change handlers for settings
paletteSelect.addEventListener('change', function (ev: Event) {
  selectedPalette = palettes.find(pal =>
    pal.name === (ev.target as HTMLSelectElement).value
  ) || selectedPalette;

  updateEnabledProcs();
});

procSelect.addEventListener('change', function (ev: Event) {
  selectedProcess = processes.find(proc =>
    proc.name === (ev.target as HTMLSelectElement).value
  ) || selectedProcess;

  updateEnabledPalettes();
});

// Add file upload handling
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
}

fileInput.addEventListener('change',
  function (ev: Event) { loadFile(ev).then(img => onLoad(img)); });

// Add click handler for view original button
function toggleViewOriginal() {
  outputCanvas.classList.contains('clip') ?
    outputCanvas.classList.remove('clip') :
    outputCanvas.classList.add('clip');
}

toggleOriginal.addEventListener('click', toggleViewOriginal);

// Show/hide advanced options
function toggleAdvOptions() {
  const visible = getComputedStyle(advancedOptDiv).getPropertyValue('display') !== 'none';
  visible ?
    advancedOptDiv.style.setProperty('display', 'none') :
    advancedOptDiv.style.removeProperty('display');
  toggleAdvanced.innerHTML = `${visible ? 'Show' : 'Hide'} advanced options`;
}

toggleAdvanced.addEventListener('click', toggleAdvOptions);

// Thread options handling
threadCount.value = '2';
threadCount.min = '1';
threadCount.max = threadsAvailable.toString();

function threadOptHandler() {
  autoThreads.disabled = !featThreads.checked;
  manualThreads.disabled = !featThreads.checked;
  threadCount.disabled = !featThreads.checked || !manualThreads.checked;
}

featThreads.addEventListener('change', threadOptHandler);
autoThreads.addEventListener('change', threadOptHandler);
manualThreads.addEventListener('change', threadOptHandler);
threadCount.addEventListener('change', threadOptHandler);

// Stop button
let running = false;
startStop.addEventListener('click', () => {
  if (running) {
    terminateAllWorkers();
    startStop.innerHTML = 'Start';
    running = false;
  } else start();
});

// ================================================================================================ \\
// Action functions ================================================================================ \\

function start(): void {
  outputCanvas.classList.remove('flash-anim');

  const threads = !featThreads.checked ? 1 :
    (autoThreads.checked ? 'auto' :
      parseInt(threadCount.value, 10));

  running = true;
  startStop.innerHTML = 'Stop';
  processImageAsync(
    imageCanvas, outputCanvas,
    selectedPalette,
    selectedProcess,
    'cdRGB',
    {
      gamma: featGamma.checked,
      threads: threads
    }
  ).then(() => {
    outputCanvas.classList.add('flash-anim');
    startStop.innerHTML = 'Start';
    running = false;
  });
}

function updateEnabledProcs(): void {
  // Disable slow processes for large palettes
  const procOpts = procSelect.children;
  for (let i = 0; i < procOpts.length; i++) {
    const option = procOpts[i] as HTMLOptionElement;
    const process = processes.find(proc => proc.name === option.value);
    if (process) {
      option.disabled = !allowSlow.checked && process.maxAllowedPaletteSize < PaletteUtils.getSize(selectedPalette);
    }
  }
}

function updateEnabledPalettes(): void {
  // Disable too large palettes
  const paletteOpts = paletteSelect.getElementsByTagName('option');
  for (let i = 0; i < paletteOpts.length; i++) {
    const option = paletteOpts[i] as HTMLOptionElement;
    const palette = palettes.find(pal => pal.name === option.value);
    if (palette) {
      option.disabled = !allowSlow.checked && selectedProcess.maxAllowedPaletteSize < PaletteUtils.getSize(palette);
    }
  }
}