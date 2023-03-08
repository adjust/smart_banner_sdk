import { Button, ButtonProps } from './button';
import hamburger from 'assets/hamburger.svg';
import styles from './icon-button.styles.module.scss';

export interface IconButtonProps extends ButtonProps {
  iconSrc: string;
}

export function IconButton(props: IconButtonProps) {
  const render = () => {
    const { label, ...restProps } = props;

    const button = Button(restProps).render();
    button.className += ' ' + styles.iconButton;

    const icon = document.createElement('span');
    icon.innerHTML = hamburger;
    icon.className = styles.icon;
    button.appendChild(icon);

    if (label) {
      const btnLabel = document.createElement('span');
      btnLabel.className = styles.label;
      btnLabel.innerText = label;
      button.appendChild(btnLabel);
    }

    return button;
  };

  return { render };
}

export function MenuIconButton(props: ButtonProps) {
  const render = () => {
    return IconButton({ iconSrc: hamburger, ...props }).render();
  };

  return { render };
}
