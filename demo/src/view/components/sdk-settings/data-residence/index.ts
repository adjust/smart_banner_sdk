import html from './data-residence.html';

export interface DataResidencyProps {
  // TODO: instead of string use DataResidency when it's properly exported as SDK public type
  onChange: (dataResidency: string) => void;
  value?: string,
}

export function DataResidency(props: DataResidencyProps) {
  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex-row';

    wrapper.innerHTML = html;
    const drSelect = wrapper.querySelector('#settings-data-residency') as HTMLSelectElement;
    drSelect.addEventListener('change', () => { props.onChange(drSelect.value); });

    if (props.value) {
      drSelect.value = props.value;
    }

    return wrapper;
  };

  return { render };
}
