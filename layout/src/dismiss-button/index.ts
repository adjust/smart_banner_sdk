import styles from './styles.module.scss';

export class DismissButton {
  private button: HTMLButtonElement;
  private color?: string;

  constructor(private onClick: () => void, color?: string) {
    this.button = document.createElement('button');
    this.color = color;
  }

  public render(root: HTMLElement) {
    this.button.className = styles.dismiss;
    this.button.addEventListener('click', this.onClick);

    this.setColor(this.color);

    root.appendChild(this.button);
  }

  private setColor(color?: string) {
    if (color) {
      this.button.style.fill = color; // FIXME doesn't work now because 'x' icon is an inline svg
    }
  }

  public update(color?: string) {
    this.setColor(color);
  }

  public destroy() {
    this.button.removeEventListener('click', this.onClick);
  }
}
