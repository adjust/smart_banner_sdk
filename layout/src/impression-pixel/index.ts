import * as styles from './styles.module.scss';

export class ImpressionPixel {
  private image: HTMLImageElement;

  constructor(private impressionUrl: string = '') {
    this.image = document.createElement('img');
    this.image.className = styles.pixel;
    this.image.width = 0;
    this.image.height = 0;
    this.image.alt = '';

    this.applyUrl();
  }

  private applyUrl() {
    if (this.impressionUrl && this.impressionUrl !== '') {
      this.image.src = this.impressionUrl;
    } else {
      this.image.removeAttribute('src');
    }
  }

  public render(root: HTMLElement) {
    root.appendChild(this.image);
  }

  public update(impressionUrl: string = '') {
    this.impressionUrl = impressionUrl;

    this.applyUrl();
  }
}
