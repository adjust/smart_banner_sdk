import { Button, ButtonProps } from './button';
import cross from 'assets/cross.svg';
import hamburger from 'assets/hamburger.svg';
import * as styles from './styles.module.scss';

export interface IconButtonProps extends ButtonProps {
  iconSrc: string;
  iconSize?: string;
}

export function IconButton(props: IconButtonProps) {
  const render = () => {
    const { label, ...restProps } = props;

    const button = Button(restProps).render();
    button.className += ' ' + styles.iconButton;

    const icon = document.createElement('span');
    icon.innerHTML = props.iconSrc;
    icon.className = styles.icon;

    if (props.iconSize) {
      icon.style.width = props.iconSize;
      icon.style.height = props.iconSize;
    }

    button.appendChild(icon);

    if (label) {
      const btnLabel = document.createElement('span');
      btnLabel.className = styles.label;
      btnLabel.innerText = label;
      button.appendChild(btnLabel);
    } else {
      button.className += ' ' + styles['no-labeled'];
    }

    return button;
  };

  return { render };
}

export function MenuIconButton(props: Omit<IconButtonProps, 'iconSrc'>) {
  const render = () => {
    return IconButton({ iconSrc: hamburger, ...props }).render();
  };

  return { render };
}

export function CloseIconButton(props: Omit<IconButtonProps, 'iconSrc'>) {
  const render = () => {
    return IconButton({ iconSrc: cross, ...props }).render();
  };

  return { render };
}
