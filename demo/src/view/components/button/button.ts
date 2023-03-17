import styles from './button.styles.module.scss';

export interface ButtonProps {
  label?: string;
  onClick?: () => void;
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

    if (props.onClick) {
      button.addEventListener('click', props.onClick);
    }

    return button;
  };

  return { render };
}
