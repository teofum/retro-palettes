// Palettes
import { CGAm4p0h, CGAm4p0l, CGAm4p1h, CGAm4p1l, CGAm5h, CGAm5l } from './palette/palettes/CGA2bModes';
import { AppleII4b, AppleIIGS, AppleIIHR } from './palette/palettes/AppleII';
import CGA4bRGBI from './palette/palettes/CGA4bRGBI';
import Cmdr644b from './palette/palettes/Cmdr644b';
import Macintosh4b from './palette/palettes/Macintosh4b';
import Win4bRGBI from './palette/palettes/Win4bRGBI';
import Win20cEx from './palette/palettes/Win20cEx';
import ZX4bRGBI from './palette/palettes/ZX4bRGBI';
import { GameBoy } from './palette/palettes/Gameboy';
import NES56 from './palette/palettes/NES';
import { RGB16, RGB256, RGB64, RGB8 } from './palette/palettes/RGB';
import { Mono2A, Mono2G, Mono2W, Mono4A, Mono4W, Mono16 } from './palette/palettes/Mono';
import { DuoBY2, DuoGM2, DuoOG2, DuoGM1, DuoRC2, DuoWA2, DuoOB2 } from './palette/palettes/Duo';
import { CMYK16, CMYK64, CMYK256, CMYKU1, CMYKU2, CMYKU4 } from './palette/palettes/CMYK';
import { Auto16, Auto256, Auto64 } from './palette/palettes/Auto';

// Processes
import Basic from './process/processes/Basic';
import FloydSteinberg from './process/processes/FloydSteinberg';
import MinAverageError from './process/processes/MinAverageError';
import { BayerLike, BayerLikeFast } from './process/processes/BayerLike';
import ColorThresholdMatrix from './process/processes/Weighted';

// Utils and functions
import { clearPaletteCache } from './palette/AutoPalette';
import { loadFile } from './utils/utils';
import { initGammaLUT } from './utils/gamma';
import PaletteUtils from './palette/PaletteUtils';
import RenderWindow from './ui/RenderWindow';
import { terminateAllWorkers, threadsAvailable } from './render/Renderer';
import UIWindow from './ui/Window';
import { makeFakeSelect } from './ui/makeFakeSelect';
import PaletteType from './palette/PaletteType';
import { makeFakeCheckbox } from './ui/makeFakeCheckbox';
import { makeNumberInput } from './ui/makeNumberInput';
import { makeFakeRadio } from './ui/makeFakeRadio';

// ================================================================================================ \\
// Initialization ================================================================================== \\

initGammaLUT(2.2);

const imageName = document.getElementById('imageName') as HTMLElement;
const browse = document.getElementById('browse') as HTMLButtonElement;
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const previewContainer = document.getElementById('previewContainer') as HTMLElement;
const previewCanvas = document.getElementById('canvasPreview') as HTMLCanvasElement;

// Basic options
const resizeInput = document.getElementById('resizeInput') as HTMLInputElement;
const useScale = document.getElementById('useScale') as HTMLInputElement;
const scaleInput = document.getElementById('scaleInput') as HTMLInputElement;
const paletteSelect = document.getElementById('paletteSelect') as HTMLInputElement;
const palettePreview = document.getElementById('paletteColors') as HTMLElement;
const procSelect = document.getElementById('processSelect') as HTMLInputElement;

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
const startStop = document.getElementById('startStop') as HTMLButtonElement;
const slowWarning = document.getElementById('slowWarning') as HTMLElement;

// Setup window content
const setupWindowContent = document.getElementById('setupWindowContent') as HTMLElement;

// Create setup window
const setupWindow = new UIWindow('Render Setup', './public/img/settings.png');
setupWindow.content.classList.remove('win-bevel');
setupWindow.content.appendChild(setupWindowContent);

// ================================================================================================ \\
// File Input ====================================================================================== \\

function onLoad(img: HTMLImageElement): void {
  const w = img.width;
  const h = img.height;

  previewCanvas.width = w;
  previewCanvas.height = h;
  previewContext?.drawImage(img, 0, 0, w, h);
  imageName.innerText = fileInput.files ? fileInput.files[0].name : 'UNTITLED IMAGE';
  previewContainer.style.removeProperty('display');
  startStop.disabled = false;

  // Clear the cache of generated palettes
  clearPaletteCache();
}

browse.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change',
  (ev: Event) => { loadFile(ev).then(img => onLoad(img)); });


// ================================================================================================ \\
// Resize/Scaling options ========================================================================== \\

makeNumberInput(resizeInput);
makeNumberInput(scaleInput);
makeFakeCheckbox(useScale);

useScale.addEventListener('change', () => scaleInput.disabled = !useScale.checked);

// ================================================================================================ \\
// Palette select ================================================================================== \\

const palettes = [
  CGAm4p0l, CGAm4p0h, CGAm4p1l, CGAm4p1h, CGAm5l, CGAm5h,
  AppleII4b, AppleIIHR, AppleIIGS, Cmdr644b, CGA4bRGBI, Macintosh4b,
  Win4bRGBI, Win20cEx, ZX4bRGBI,
  GameBoy, NES56,
  Mono2W, Mono2G, Mono2A, Mono4W, Mono4A, Mono16,
  DuoGM1, DuoRC2, DuoGM2, DuoBY2, DuoWA2, DuoOG2, DuoOB2,
  RGB8, RGB16, RGB64, RGB256,
  CMYKU1, CMYKU2, CMYKU4, CMYK16, CMYK64, CMYK256,
  Auto16, Auto64, Auto256
];
let selectedPalette = Win4bRGBI;
paletteSelect.value = selectedPalette.name;
updatePaletteColors();

makeFakeSelect(paletteSelect,
  palettes.map(p => ({ name: p.name, value: p })),
  (selected) => {
    selectedPalette = selected.value;
    updateEnabledProcs();
    updatePaletteColors();
  }
);


// ================================================================================================ \\
// Process select ================================================================================== \\

const processes = [
  Basic,
  FloydSteinberg,
  MinAverageError,
  BayerLikeFast,
  BayerLike,
  ColorThresholdMatrix
];
let selectedProcess = Basic;
procSelect.value = selectedProcess.name;

makeFakeSelect(procSelect,
  processes.map(p => ({ name: p.name, value: p })),
  (selected) => {
    selectedProcess = selected.value;
    updateEnabledPalettes();
  }
);


// ================================================================================================ \\
// Advanced options ================================================================================ \\

makeFakeCheckbox(featGamma);
makeFakeCheckbox(allowSlow);
makeFakeCheckbox(featThreads);

allowSlow.addEventListener('change', function () {
  allowSlow.checked ?
    slowWarning.style.removeProperty('display') :
    slowWarning.style.setProperty('display', 'none');

  updateEnabledProcs();
  updateEnabledPalettes();
});

const previewContext = previewCanvas.getContext('2d');

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

makeFakeRadio(autoThreads);
makeFakeRadio(manualThreads);
makeNumberInput(threadCount);


// ================================================================================================ \\
// Buttons ========================================================================================= \\

// Show/hide advanced options
function toggleAdvOptions() {
  const visible = getComputedStyle(advancedOptDiv).getPropertyValue('display') !== 'none';
  visible ?
    advancedOptDiv.style.setProperty('display', 'none') :
    advancedOptDiv.style.removeProperty('display');
}

toggleAdvanced.addEventListener('click', toggleAdvOptions);


// Stop button
let running = false;
startStop.addEventListener('click', () => {
  if (running) {
    terminateAllWorkers();
    (startStop.children[0] as HTMLElement).innerText = 'Start';
    running = false;
  } else start();
});

// ================================================================================================ \\
// Action functions ================================================================================ \\

function getRenderSize(): { w: number, h: number } {
  let w = previewCanvas.width;
  let h = previewCanvas.height;

  const maxSize = parseInt(resizeInput.value, 10);
  if (w >= h && w > maxSize) {
    h = ~~(maxSize * (h / w));
    w = maxSize;
  }
  if (h > w && h > maxSize) {
    w = ~~(maxSize * (w / h));
    h = maxSize;
  }

  return { w, h };
}

function start(): void {
  // Calculate the rnedered image size
  const renderSize = getRenderSize();
  const scale = useScale.checked ? parseInt(scaleInput.value, 10) : undefined;

  // Create a new window
  const title = `Render: ${fileInput.files ? fileInput.files[0].name : 'untitled'}`
    + ` - ${selectedPalette.name}, ${selectedProcess.name}`
    + ` @ ${renderSize.w}x${renderSize.h}`
    + ` ${scale ? `(${scale}x)` : ''}`;

  renderSize.w *= (scale || 1);
  renderSize.h *= (scale || 1);

  const renderWindow = new RenderWindow(title, renderSize);

  // Parse threads value
  const threads = !featThreads.checked ? 1 :
    (autoThreads.checked ? 'auto' :
      parseInt(threadCount.value, 10));

  // Start rendering on this window
  running = true;
  (startStop.children[0] as HTMLElement).innerText = 'Stop';
  renderWindow.render(previewCanvas, {
    palette: selectedPalette,
    process: selectedProcess,
    threads: threads,
    features: {
      gamma: featGamma.checked
    },
    scaling: useScale.checked ? parseInt(scaleInput.value, 10) : undefined
  }).then(() => {
    (startStop.children[0] as HTMLElement).innerText = 'Start';
    running = false;
  });
}

function updateEnabledProcs(): void {
  // Disable slow processes for large palettes
  const procOpts = procSelect.parentElement?.getElementsByClassName('fake-select-option');
  if (!procOpts) return;

  for (let i = 0; i < procOpts.length; i++) {
    const option = procOpts[i] as HTMLElement;
    const process = processes.find(proc => proc.name === option.innerText);
    if (process) {
      if (!allowSlow.checked && process.maxAllowedPaletteSize < PaletteUtils.getSize(selectedPalette))
        option.setAttribute('disabled', 'true');
      else option.removeAttribute('disabled');
    }
  }
}

function updateEnabledPalettes(): void {
  // Disable too large palettes
  const paletteOpts = paletteSelect.parentElement?.getElementsByClassName('fake-select-option');
  if (!paletteOpts) return;

  for (let i = 0; i < paletteOpts.length; i++) {
    const option = paletteOpts[i] as HTMLElement;
    const palette = palettes.find(pal => pal.name === option.innerText);
    if (palette) {
      if (!allowSlow.checked && selectedProcess.maxAllowedPaletteSize < PaletteUtils.getSize(palette))
        option.setAttribute('disabled', 'true');
      else option.removeAttribute('disabled');
    }
  }
}

function updatePaletteColors(): void {
  // Clear the preview
  while (palettePreview.firstChild)
    palettePreview.removeChild(palettePreview.firstChild);

  if (selectedPalette.type === PaletteType.Auto) return;
  PaletteUtils.getColors(selectedPalette).forEach(color => {
    let cssColor = '#';
    for (let i = 0; i < 3; i++) {
      const channel = color[i].toString(16);
      cssColor += (channel.length === 1 ? '0' + channel : channel);
    }

    const colorSquare = document.createElement('div');
    colorSquare.className = 'win-bevel content';
    colorSquare.style.backgroundColor = cssColor;
    colorSquare.title = cssColor;

    palettePreview.appendChild(colorSquare);
  });
}