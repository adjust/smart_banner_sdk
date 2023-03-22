import html from './language.html';

export interface LanguageProps {
  value?: string;
  onChange: (value: string) => void;
}

export function Language(props: LanguageProps) {
  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex-row';

    wrapper.innerHTML = html;
    const input = wrapper.querySelector('#settings-language') as HTMLInputElement;
    input.addEventListener('change', () => { props.onChange(input.value); });

    if (props.value) {
      input.value = props.value;
    }

    return wrapper;
  };

  return { render };
}
