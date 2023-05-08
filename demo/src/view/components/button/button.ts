import styles from './button.styles.module.scss';

export interface ButtonProps {
  label?: string;
  clickHandler?: () => void;
  variant?: 'primary' | 'secondary'
}

export function Button(props: ButtonProps) {
  const render = () => {
    const button = document.createElement('button');
    button.className = styles.button;

    if (props.variant === 'secondary') {
      button.className += ` ${styles.secondary}`;
    } else {
      button.className += ` ${styles.primary}`;
    }

    if (props.label) {
      button.innerText = props.label;
    }

    if (props.clickHandler) {
      button.addEventListener('click', props.clickHandler);
    }

    return button;
  };

  return { render };
}
