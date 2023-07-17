import cross from '../../assets/cross.svg';
import styles from './styles.module.scss';

export class DismissButton {
  private button: HTMLButtonElement;
  private crossSvg: SVGElement | null = null;
  private color?: string;

  constructor(private onClick: () => void, color?: string) {
    this.button = document.createElement('button');
    this.button.innerHTML = cross;
    this.button.className = styles.dismiss;

    const svg = this.button.querySelector('svg');
    if (svg) {
      this.crossSvg = svg;
    }

    this.color = color;
  }

  public render(root: HTMLElement) {
    this.button.addEventListener('click', this.onClick);

    this.setColor(this.color);

    root.appendChild(this.button);
  }

  private setColor(color?: string) {
    if (this.crossSvg && color) {
      this.crossSvg.style.fill = color;
    }
  }

  public update(color?: string) {
    this.setColor(color);
  }

  public destroy() {
    this.button.removeEventListener('click', this.onClick);
  }
}
