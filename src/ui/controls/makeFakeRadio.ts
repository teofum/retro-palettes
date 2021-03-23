export function makeFakeRadio(input: HTMLInputElement): void {
  const fakeRadio = document.createElement('div');
  fakeRadio.className = 'fake-radio';
  fakeRadio.addEventListener('click', () => input.click());
  input.checked ?
    fakeRadio.classList.add('checked') :
    fakeRadio.classList.remove('checked');

  const radioGroup = document.getElementsByName(input.name);
  radioGroup.forEach(radio =>
    radio.addEventListener('change', () => {
      input.checked ?
        fakeRadio.classList.add('checked') :
        fakeRadio.classList.remove('checked');
    })
  );

  const config = { attributes: true, childList: false, subtree: false };
  const disabledObserver = new MutationObserver((mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'disabled')
        input.disabled ?
          fakeRadio.setAttribute('disabled', 'true') :
          fakeRadio.removeAttribute('disabled');
    });
  }));

  disabledObserver.observe(input, config);

  input.before(fakeRadio);
  input.hidden = true;
}