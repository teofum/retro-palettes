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
import { RGB16, RGB256, RGB32, RGB64, RGB8 } from './palette/palettes/RGB';
import { Mono2A, Mono2G, Mono2W, Mono4A, Mono4W, Mono16 } from './palette/palettes/Mono';
import { DuoBY2, DuoGM2, DuoOG2, DuoGM1, DuoRC2, DuoWA2, DuoOB2, DuoCM2 } from './palette/palettes/Duo';
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
import { color2hex, loadFile } from './utils/utils';
import { initGammaLUT } from './utils/gamma';
import PaletteUtils from './palette/PaletteUtils';
import RenderWindow from './ui/RenderWindow';
import { terminateAllWorkers, threadsAvailable } from './render/Renderer';
import UIWindow from './ui/Window';
import { makeFakeSelect } from './ui/controls/makeFakeSelect';
import PaletteType from './palette/PaletteType';
import { makeFakeCheckbox } from './ui/controls/makeFakeCheckbox';
import { makeNumberInput } from './ui/controls/makeNumberInput';
import { makeFakeRadio } from './ui/controls/makeFakeRadio';
import prepPalette from './palette/prepPalette';
import Palette from './palette/Palette';
import PaletteGroup from './palette/PaletteGroup';
import setFakeSelectOptions from './ui/controls/setFakeSelectOptions';
import { Custom } from './palette/palettes/Custom';
import EditWindow from './ui/EditWindow';
import { Process } from './process/Process';

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
const paletteGroupSelect = document.getElementById('paletteGroupSelect') as HTMLInputElement;
const paletteSelect = document.getElementById('paletteSelect') as HTMLInputElement;
const palettePreview = document.getElementById('paletteColors') as HTMLElement;
const procSelect = document.getElementById('processSelect') as HTMLInputElement;
const btnCreatePalette = document.getElementById('createPalette') as HTMLButtonElement;
const btnCopyPalette = document.getElementById('copyPalette') as HTMLButtonElement;
const btnEditPalette = document.getElementById('editPalette') as HTMLButtonElement;

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

// Disable closing the setup window
const setupClose = setupWindow.frame.getElementsByClassName('close').item(0);
if (setupClose) setupClose.setAttribute('disabled', 'true');

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
  updatePaletteColors();
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
  DuoGM1, DuoRC2, DuoGM2, DuoBY2, DuoWA2, DuoOG2, DuoOB2, DuoCM2,
  RGB8, RGB16, RGB32, RGB64, RGB256,
  CMYKU1, CMYKU2, CMYKU4, CMYK16, CMYK64, CMYK256,
  Auto16, Auto64, Auto256,
  Custom
];
let selectedPalette = Win4bRGBI;
paletteSelect.value = selectedPalette.name;
paletteGroupSelect.value = selectedPalette.group;
updatePaletteColors();

const selectPalette = (palette: Palette): void => {
  selectedPalette = palette;
  updateEnabledProcs();
  updatePaletteColors();

  selectedPalette.group === PaletteGroup.User ?
    btnEditPalette.style.removeProperty('display') :
    btnEditPalette.style.setProperty('display', 'none');

  // Special handling for a selection handled programatically,
  // makes sure the right option is displayed
  if (paletteSelect.value !== selectedPalette.name)
    paletteSelect.value = selectedPalette.name;
};

const editPalette = (palette: Palette): void => {
  if (!editWindow) {
    editWindow = new EditWindow(palette);
    editWindow.onchange = updatePaletteColors;
    editWindow.onnamechange = changedPalette => {
      // Refresh the palette list if it's currently selected
      if (selectedPalette.group === PaletteGroup.User) {
        setFakeSelectOptions(
          paletteSelectRef,
          palettes
            .filter(p => p.group === PaletteGroup.User)
            .map(p => ({ name: p.name, value: p }))
        );

        // Update the displayed name as well if the changed palette is selected
        if (changedPalette === selectedPalette)
          paletteSelect.value = changedPalette.name;
      }
    };
    editWindow.ondestroy = () => editWindow = undefined; // Reset reference
  } else {
    editWindow.loadCustomPalette(palette);
  }
};

const createCustomPalette = (
  name: string = 'Custom Palette',
  data: number[] = [0, 0, 0, 255, 255, 255]
): void => {
  const newPalette: Palette = {
    name: name,
    type: PaletteType.Indexed,
    group: PaletteGroup.User,
    data: data
  };

  palettes.push(newPalette);
  selectPalGroup(PaletteGroup.User); // Reload palette group so the new palette appears in dropdown
  selectPalette(newPalette);
  editPalette(selectedPalette);
};

const selectPalGroup = (group: PaletteGroup): void => {
  setFakeSelectOptions(
    paletteSelectRef,
    palettes
      .filter(p => p.group === group)
      .map(p => ({ name: p.name, value: p }))
  );
  updateEnabledPalettes();

  group === PaletteGroup.User ?
    btnCreatePalette.style.removeProperty('display') :
    btnCreatePalette.style.setProperty('display', 'none');

  // Select the first enabled option in the group
  const options = paletteSelectRef.optionList.children;
  let firstEnabled: HTMLElement | undefined;
  for (let i = 0; i < options.length; i++) {
    if (options[i].getAttribute('disabled') === null) {
      firstEnabled = options[i] as HTMLElement;
      break;
    }
  }

  if (firstEnabled) {
    firstEnabled.click();
    firstEnabled.click(); // Second click closes the select
  }

  // Special handling for a selection handled programatically,
  // makes sure the right option is displayed
  if (paletteGroupSelect.value !== group)
    paletteGroupSelect.value = group;
};

let editWindow: EditWindow | undefined;
btnEditPalette.addEventListener('click', () => editPalette(selectedPalette));
btnCreatePalette.addEventListener('click', () => createCustomPalette());
btnCopyPalette.addEventListener('click',
  () => createCustomPalette(`${selectedPalette.name} Copy`, selectedPalette.data));

const paletteSelectRef = makeFakeSelect(paletteSelect,
  palettes
    .filter(p => p.group === paletteGroupSelect.value)
    .map(p => ({ name: p.name, value: p })),
  (selected) => selectPalette(selected.value)
);

makeFakeSelect(paletteGroupSelect,
  Object.keys(PaletteGroup)
    .map(k => {
      // Awful hack, TypeScript really needs a clean way to list an Enum's values
      const value = ((PaletteGroup as any)[k as string] as string);
      return { name: value, value: value };
    })
    .filter(opt => // Filter out hidden and empty palette groups
      !opt.value.startsWith('__') &&
      palettes.filter(p => p.group === opt.value).length > 0
    ),
  (selected) => selectPalGroup(selected.value)
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

function combinationAllowed(palette: Palette, process: Process): boolean {
  return palette.group === PaletteGroup.User || PaletteUtils.getSize(palette) < process.maxAllowedPaletteSize;
}

function updateEnabledProcs(): void {
  // Disable slow processes for large palettes
  const procOpts = procSelect.parentElement?.getElementsByClassName('fake-select-option');
  if (!procOpts) return;

  for (let i = 0; i < procOpts.length; i++) {
    const option = procOpts[i] as HTMLElement;
    const process = processes.find(proc => proc.name === option.innerText);
    if (process) {
      if (!allowSlow.checked && !combinationAllowed(selectedPalette, process))
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
      if (!allowSlow.checked && !combinationAllowed(palette, selectedProcess))
        option.setAttribute('disabled', 'true');
      else option.removeAttribute('disabled');
    }
  }
}

function updatePaletteColors(): void {
  // Clear the preview
  while (palettePreview.firstChild)
    palettePreview.removeChild(palettePreview.firstChild);

  // If an auto palette is selected, generate it now
  // We don't need to keep it, as it will be automatically cached
  const palette = (selectedPalette.type === PaletteType.Auto) ?
    autoPaletteFromThumb() :
    selectedPalette;

  PaletteUtils.getColors(palette).forEach(color => {
    const cssColor = color2hex(color);

    const colorSquare = document.createElement('div');
    colorSquare.className = 'win-bevel content';
    colorSquare.style.backgroundColor = cssColor;
    colorSquare.title = cssColor;

    palettePreview.appendChild(colorSquare);
  });
}

function autoPaletteFromThumb(): Palette {
  const downscaled = document.createElement('canvas');
  if (previewCanvas.width >= previewCanvas.height) {
    downscaled.width = 240;
    downscaled.height = 240 * (previewCanvas.height / previewCanvas.width);
  } else {
    downscaled.width = 240 * (previewCanvas.width / previewCanvas.height);
    downscaled.height = 240;
  }

  const ctxDownscaled = downscaled.getContext('2d');
  if (!ctxDownscaled) throw new Error('Unable to get downscaled context!');

  ctxDownscaled.drawImage(previewCanvas, 0, 0, downscaled.width, downscaled.height);

  const startTime = new Date().getTime();
  const imageData = ctxDownscaled.getImageData(0, 0, downscaled.width, downscaled.height);
  const autopalette = prepPalette(selectedPalette, selectedProcess, imageData);
  console.log(`Palette processing done in ${new Date().getTime() - startTime}ms`);

  return autopalette;
}