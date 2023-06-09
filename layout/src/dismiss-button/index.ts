import styles from './styles.module.scss';

export class DismissButton {
  private button: HTMLButtonElement;

  constructor(private onClick: () => void) {
    this.button = document.createElement('button');
  }

  public render(root: HTMLElement) {
    this.button.className = styles.dismiss;
    this.button.addEventListener('click', this.onClick);

    root.appendChild(this.button);
  }

  public destroy() {
    this.button.removeEventListener('click', this.onClick);
  }
}
