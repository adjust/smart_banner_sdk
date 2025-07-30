import { Button } from '../../button';
import * as styles from './sdk-methods.module.scss';

export interface SdkMethodsProps {
  onInit: () => void;
  onHide: () => void;
  onShow: () => void;
}

export function SdkMethods(props: SdkMethodsProps) {
  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex-row ' + styles['buttons-container'];

    wrapper.append(
      Button({ label: 'init', onClick: props.onInit }).render(),
      Button({ label: 'hide', onClick: props.onHide }).render(),
      Button({ label: 'show', onClick: props.onShow }).render()
    );

    return wrapper;
  };

  return { render };
}
