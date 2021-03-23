export interface FakeSelectOption {
  name: string;
  value: any;
}

export type FakeSelectEventHandler = (picked: FakeSelectOption) => void;

export interface FakeSelectRef {
  input: HTMLInputElement;
  optionList: HTMLElement;
  onchange: FakeSelectEventHandler;
}

export function makeFakeSelect(
  input: HTMLInputElement,
  options: FakeSelectOption[],
  onchange: FakeSelectEventHandler
): FakeSelectRef {
  // Create a list to hold the options
  const selectList = document.createElement('ul');
  selectList.className = 'fake-select-option-list';

  // Create the options
  options.forEach(option => {
    const selectOption = document.createElement('li');
    selectOption.className = 'fake-select-option';
    selectOption.dataset.value = option.name;
    selectOption.innerText = option.name;

    // Add change event listener
    selectOption.addEventListener('click', () => {
      if (selectOption.hasAttribute('disabled')) return;
 
      input.value = option.name;
      onchange(option);
    });
    selectList.appendChild(selectOption);
  });

  const selectButtonImg = document.createElement('img');
  selectButtonImg.src = './public/img/scrolldown.png';

  const selectButton = document.createElement('button');
  selectButton.className = 'fake-select-button win-bevel';
  selectButton.appendChild(selectButtonImg);

  const selectContainer = document.createElement('div');
  selectContainer.className = input.className + ' fake-select';
  input.className = 'fake-select-input win-bevel';

  input.parentElement?.replaceChild(selectContainer, input);
  selectContainer.appendChild(input);
  selectContainer.appendChild(selectButton);
  selectContainer.appendChild(selectList);

  selectContainer.addEventListener('click', (ev: Event) => {
    ev.stopPropagation();
    if ((ev as MouseEvent).button !== 0) return;

    if (!selectList.classList.contains('expanded')) {
      selectList.classList.add('expanded');

      const clickAnywhere = (ev: Event) => {
        const target = (ev as MouseEvent).target as Element;
        if (selectContainer.contains(target)) return;

        selectList.classList.remove('expanded');
        window.removeEventListener('mousedown', clickAnywhere);
      };

      window.addEventListener('mousedown', clickAnywhere);
    } else selectList.classList.remove('expanded');
  });
  input.addEventListener('click', () => selectContainer.click());

  input.style.userSelect = 'none';
  input.style.cursor = 'default';
  input.disabled = true;

  return {
    input: input,
    optionList: selectList,
    onchange: onchange
  };
}