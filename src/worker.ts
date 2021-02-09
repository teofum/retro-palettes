import { getColorDistanceFnById } from './colorDistance/ColorDistanceFn';
import ColorPalette from './palette/ColorPalette';
import PaletteType from './palette/PaletteGroups';
import { getAutoPalette } from './paletteGen/getAutoPalette';
import { getProcessById } from './process/Process';
//import { ProcessEvent, ProgressFn } from './process/ProcessWorker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

interface ProcWorkerStartArgs {
  dataIn: ImageData;
  palette: ColorPalette;
  procId: string;
  distFnId: string;
}

enum ProcessEvent {
  Progress,
  Done,
  Error
}

type ProgressFn = ((current: number, total: number) => void);

const reportProgress: ProgressFn = (current: number, total: number, partial?: ImageData) => {
  ctx.postMessage({ msg: ProcessEvent.Progress, params: { current, total, partial } });
};

ctx.addEventListener('message', (ev: MessageEvent) => {
  const msg = ev.data as ProcWorkerStartArgs;

  // Special handling for certain palettes
  const palette = (msg.palette.type === PaletteType.PAuto) ?
    getAutoPalette(msg.palette, msg.dataIn) :
    msg.palette;

  // Convert image using the passed process
  const process = getProcessById(msg.procId);
  if (process) {
    const distFn = getColorDistanceFnById(msg.distFnId);
    process.function(msg.dataIn, palette, distFn, reportProgress);
    ctx.postMessage({ msg: ProcessEvent.Done, params: { result: msg.dataIn } });
  } else ctx.postMessage({ msg: ProcessEvent.Error, params: { error: 'bad procId' } });
});