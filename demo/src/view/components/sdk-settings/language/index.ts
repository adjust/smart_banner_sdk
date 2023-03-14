import html from './language.html';

export interface LanguageProps {
  onChange: (value: string) => void;
}

export function Language(props: LanguageProps) {
  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex-row';

    wrapper.innerHTML = html;
    const input = wrapper.querySelector('#settings-language') as HTMLInputElement;
    input.addEventListener('change', () => { props.onChange(input.value); });
    return wrapper;
  };

  return { render };
}
