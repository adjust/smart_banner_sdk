import html from './banner-parent.html';

export interface BannerParentProps {
  value: string;
  onChange: (value: string) => void;
}

export function BannerParent(props: BannerParentProps) {
  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex-row';

    wrapper.innerHTML = html;
    const input = wrapper.querySelector('#settings-view-root') as HTMLInputElement;
    input.value = props.value;
    input.addEventListener('change', () => { props.onChange(input.value); });
    return wrapper;
  };

  return { render };
}
