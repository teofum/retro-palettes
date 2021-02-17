export function makeFakeCheckbox(input: HTMLInputElement): void {
  const fakeCheckbox = document.createElement('div');
  fakeCheckbox.className = 'win-bevel checkbox fake-checkbox';
  input.checked ?
      fakeCheckbox.classList.add('checked') :
      fakeCheckbox.classList.remove('checked');

  fakeCheckbox.addEventListener('click', () => input.click());
  input.addEventListener('change', () => {
    input.checked ?
      fakeCheckbox.classList.add('checked') :
      fakeCheckbox.classList.remove('checked');
  });
  
  const config = { attributes: true, childList: false, subtree: false };
  const disabledObserver = new MutationObserver((mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'disabled')
        input.disabled ?
          fakeCheckbox.setAttribute('disabled', 'true') :
          fakeCheckbox.removeAttribute('disabled');
    });
  }));

  disabledObserver.observe(input, config);

  input.before(fakeCheckbox);
  input.hidden = true;
}