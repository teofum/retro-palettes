import ProcWorker from 'worker-loader!../worker';
import ColorPalette from '../palette/ColorPalette';

export enum ProcessEvent {
  Progress,
  Done,
  Error
}

export interface ProcessWorkerMsg {
  msg: ProcessEvent;
  params: any;
}

export type ProgressFn = ((current: number, total: number, partial?: ImageData) => void);

// Wraps the process worker and abstracts the messages
class ProcessWorker {
  private worker: Worker;
  private busy: boolean = false;

  public onprogress: ((progress: { current: number, total: number, partial?: ImageData }) => void) | undefined;
  public onfinish: ((result: ImageData) => void) | undefined;
  public onerror: ((message: string) => void) | undefined;

  public get ready(): boolean { return !this.busy; }

  constructor() {
    this.worker = new ProcWorker();

    this.worker.onmessage = (ev: MessageEvent) => {
      const msg = ev.data as ProcessWorkerMsg;
      switch (msg.msg) {
        case ProcessEvent.Progress:
          if (this.onprogress) this.onprogress(msg.params);
          break;
        case ProcessEvent.Done:
          if (this.onfinish) this.onfinish(msg.params.result);
          this.busy = false;
          break;
        case ProcessEvent.Error:
          if (this.onerror) this.onerror(msg.params.error);
          this.busy = false;
          break;
      }
    };
  }

  public start(
    dataIn: ImageData,
    palette: ColorPalette,
    procId: string,
    distFnId: string
  ): boolean {
    if (this.busy) return false;
    this.busy = true;

    this.worker.postMessage({ dataIn, palette, procId, distFnId });
    return true;
  }
}

export default ProcessWorker;