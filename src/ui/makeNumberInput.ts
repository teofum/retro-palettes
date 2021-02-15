export function makeNumberInput(input: HTMLInputElement): void {
  input.addEventListener('keypress', (ev: Event) => {
    if (!(ev as KeyboardEvent).key.match(/[0-9]/)) ev.preventDefault();
  });
}