import { FakeSelectOption, FakeSelectRef } from './makeFakeSelect';

function setFakeSelectOptions(
  selectRef: FakeSelectRef,
  options: FakeSelectOption[],
  append: boolean = false
): void {
  // Clear current options, unless append flag is set
  if (!append)
    while (selectRef.optionList.firstChild)
      selectRef.optionList.removeChild(selectRef.optionList.firstChild);

  // Create the options
  options.forEach(option => {
    const selectOption = document.createElement('li');
    selectOption.className = 'fake-select-option';
    selectOption.dataset.value = option.name;
    selectOption.innerText = option.name;

    // Add change event listener
    selectOption.addEventListener('click', () => {
      if (selectOption.hasAttribute('disabled')) return;
 
      selectRef.input.value = option.name;
      selectRef.onchange(option);
    });
    selectRef.optionList.appendChild(selectOption);
  });
}

export default setFakeSelectOptions;