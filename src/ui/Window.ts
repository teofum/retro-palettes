class UIWindow {
  private static windowList: UIWindow[] = [];
  private static lastId: number = 0;

  private static recalculateZIndices(): void {
    this.windowList.forEach((wnd, i) =>
      wnd.frame.style.zIndex = (i * 100).toString()
    );
  }

  private uuid: number;
  private contentRef: HTMLElement;
  private titleRef: HTMLElement;
  private frameRef: HTMLElement;

  public get id(): number { return this.uuid; }
  public get content(): HTMLElement { return this.contentRef; }
  public get frame(): HTMLElement { return this.frameRef; }

  public get title(): string { return this.titleRef.innerText; }
  public set title(value: string) { this.titleRef.innerText = value; }

  constructor(title: string, iconUrl?: string) {
    // Assign a unique ID (probably not thread safe, so... don't)
    this.uuid = UIWindow.lastId++;

    // Create window icon
    let iconElem: HTMLImageElement | undefined;
    if (iconUrl) {
      iconElem = document.createElement('img');
      iconElem.src = iconUrl;
      iconElem.className = 'window-icon';
    }

    // Create window title
    const titleElem = document.createElement('b');
    titleElem.innerText = title;
    titleElem.className = 'window-title';
    this.titleRef = titleElem;

    // Create titlebar
    const closeIcon = document.createElement('img');
    closeIcon.src = './public/img/close.png';

    const close = document.createElement('button');
    close.className = 'win-bevel';
    close.appendChild(closeIcon);

    const titleButtons = document.createElement('div');
    titleButtons.className = 'titlebar-buttons';
    titleButtons.appendChild(close);

    const titlebar = document.createElement('div');
    titlebar.className = 'titlebar';
    titlebar.appendChild(titleElem);
    titlebar.appendChild(titleButtons);
    if (iconElem) titlebar.appendChild(iconElem);

    const content = document.createElement('div');
    content.className = 'window-content win-bevel';
    this.contentRef = content;

    // Create window frame
    const frame = document.createElement('div');
    frame.className = 'window win-bevel';
    frame.appendChild(titlebar);
    frame.appendChild(content);
    this.frameRef = frame;

    // Add event listeners
    frame.addEventListener('mousedown', this.focus);
    titlebar.addEventListener('mousedown', this.mouseDownHandler);
    close.addEventListener('click', this.destroy);

    document.body.appendChild(frame);
    UIWindow.windowList.push(this);
    this.focus();
  }

  public focus = (): void => {
    // If this window is not at the top, send it to the top
    const thisIndex = UIWindow.windowList.indexOf(this);
    if (thisIndex !== UIWindow.windowList.length - 1) {
      UIWindow.windowList.splice(thisIndex, 1);
      UIWindow.windowList.push(this);
    }
    UIWindow.recalculateZIndices();

    // Make the window active, and every other window inactive
    UIWindow.windowList.forEach(wnd => wnd.setActive(wnd.id === this.id));
  }

  public destroy = (): void => {
    // Remove from window list
    const thisIndex = UIWindow.windowList.indexOf(this);
    UIWindow.windowList.splice(thisIndex, 1);

    // Remove from DOM
    this.frame.remove();

    // Switch focus to second topmost window
    const secondTopmost = UIWindow.windowList[UIWindow.windowList.length - 1];
    if (secondTopmost) secondTopmost.focus();
  }

  private setActive(active: boolean): void {
    active ?
      this.frame.classList.add('active-window') :
      this.frame.classList.remove('active-window');
  }

  private startDrag = (ev: MouseEvent): void => {
    if (ev.button !== 0) return;

    const dragHandler = (ev: MouseEvent) => {
      const windowRect = this.frame.getBoundingClientRect();
      this.frame.style.left = `${windowRect.left + ev.movementX}px`;
      this.frame.style.top = `${windowRect.top + ev.movementY}px`;
    };

    const dragEndHandler = (ev: MouseEvent) => {
      if (ev.button !== 0) return;

      window.removeEventListener('mousemove', dragHandler);
      window.removeEventListener('mouseup', dragEndHandler);
    };

    window.addEventListener('mousemove', dragHandler);
    window.addEventListener('mouseup', dragEndHandler);
  }

  private mouseDownHandler = (ev: Event): void => {
    if ((ev as MouseEvent).button !== 0) return;

    const startDrag = (ev: Event) => {
      this.startDrag(ev as MouseEvent);
      window.removeEventListener('mousemove', startDrag);
      window.removeEventListener('mouseup', cancelDrag);
    };

    const cancelDrag = () => {
      window.removeEventListener('mousemove', startDrag);
      window.removeEventListener('mouseup', cancelDrag);
    };

    window.addEventListener('mousemove', startDrag);
    window.addEventListener('mouseup', cancelDrag);
  }
}

export default UIWindow;