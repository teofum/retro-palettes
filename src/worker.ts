import { getColorDistanceFnById } from './color/CompareFn';
import { ProcessFeatures } from './render/RenderUtils';
import Palette from './palette/Palette';
import { getProcessById } from './process/Process';
import { initGammaLUT } from './utils/gamma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

interface ProcWorkerStartArgs {
  dataIn: ImageData;
  palette: Palette;
  procId: string;
  distFnId: string;
  features: ProcessFeatures;
}

enum ProcessEvent {
  Progress,
  Done,
  Error
}

type ProgressFn = ((current: number, total: number, partial?: ImageData) => void);

const reportProgress: ProgressFn = (current: number, total: number, partial?: ImageData) => {
  ctx.postMessage({ msg: ProcessEvent.Progress, params: { current, total, partial } });
};

ctx.addEventListener('message', (ev: MessageEvent) => {
  const msg = ev.data as ProcWorkerStartArgs;

  // Convert image using the passed process
  const process = getProcessById(msg.procId);

  if (!process) {
    ctx.postMessage({
      msg: ProcessEvent.Error,
      params: { error: `WorkerInit failed: process ${msg.procId} not found` }
    });
    self.close();
    return;
  }

  initGammaLUT(2.2);

  const distFn = getColorDistanceFnById(msg.distFnId);
  process.procFn(msg.dataIn, msg.palette, distFn, msg.features, reportProgress);
  ctx.postMessage({ msg: ProcessEvent.Done, params: { result: msg.dataIn } });
  self.close();
});