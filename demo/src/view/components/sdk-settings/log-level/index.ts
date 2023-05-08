import { LogLevel } from '@adjustcom/smart-banner-sdk';
import html from './log-level.html';

export interface LogLevelProps {
  onChange: (value: LogLevel) => void;
}

export function LogLevel(props: LogLevelProps) {
  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex-row';

    wrapper.innerHTML = html;
    const input = wrapper.querySelector('#settings-log-level') as HTMLInputElement;
    input.addEventListener('change', () => { props.onChange(input.value as LogLevel); });

    return wrapper;
  };

  return { render };
}
