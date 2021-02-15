export function makeFakeCheckbox(input: HTMLInputElement): void {
  const fakeCheckbox = document.createElement('div');
  fakeCheckbox.className = 'win-bevel checkbox fake-checkbox';
  fakeCheckbox.style.backgroundImage = input.checked ?
    'url(public/img/check.png)' :
    '';

  fakeCheckbox.addEventListener('click', () => {
    input.click();
    fakeCheckbox.style.backgroundImage = input.checked ?
      'url(public/img/check.png)' :
      '';
  });

  input.before(fakeCheckbox);
  input.hidden = true;
}