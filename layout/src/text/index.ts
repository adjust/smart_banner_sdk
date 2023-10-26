import styles from './styles.module.scss';

export enum TextType {
  Title,
  Description
}

export class BannerText {
  private element: HTMLElement;

  constructor(type: TextType, private text?: string, private color?: string) {
    if (type === TextType.Title) {
      this.element = document.createElement('h4');
    } else {
      this.element = document.createElement('p');
    }

    this.element.className = styles['banner-text'];
  }

  private renderText(text?: string, color?: string) {
    if (text) {
      this.element.hidden = false;
      this.element.innerText = text;
    } else {
      this.element.hidden = true;
    }

    if (color) {
      this.element.style.color = color;
    }

    return this.element;
  }

  public render(root: HTMLElement) {
    root.appendChild(this.renderText(this.text, this.color));
  }

  public update(text?: string, color?: string) {
    this.text = text;
    this.color = color;

    this.renderText(text, color);
  }
}
