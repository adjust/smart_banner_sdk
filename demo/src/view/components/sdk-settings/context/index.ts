import html from './context.html';

export interface ContextProps {
  onChange: (value: string) => void;
}

export function Context(props: ContextProps) {
  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex-column';

    wrapper.innerHTML = html;
    const input = wrapper.querySelector('#settings-context') as HTMLInputElement;
    input.placeholder = 'This is just a stub!';
    input.addEventListener('change', () => { props.onChange(input.value); });
    return wrapper;
  };

  return { render };
}
