import * as styles from './styles.module.scss';

interface TextStyle {
  color?: string;
  fontSize?: number;
  fontFamily?: string;
}

export enum TextType {
  Title,
  Description
}

export class BannerText {
  private element: HTMLElement;

  constructor(type: TextType, private text?: string, private style?: TextStyle) {
    if (type === TextType.Title) {
      this.element = document.createElement('h4');
    } else {
      this.element = document.createElement('p');
    }

    this.element.className = styles['banner-text'];
  }

  private renderText(text?: string, style?: TextStyle) {
    if (text) {
      this.element.hidden = false;
      this.element.innerText = text;
    } else {
      this.element.hidden = true;
    }

    if (style) {
      const { color = '', fontSize, fontFamily = '' } = style;

      this.element.style.color = color;
      this.element.style.fontFamily = fontFamily;
      if (fontSize) {
        this.element.style.fontSize = fontSize + 'px';
      } else {
        this.element.style.fontSize = '';
      }
    }

    return this.element;
  }

  public render(root: HTMLElement) {
    root.appendChild(this.renderText(this.text, this.style));
  }

  public update(text?: string, style?: TextStyle) {
    this.text = text;

    this.style = {
      ...this.style,
      ...style
    };

    this.renderText(text, style);
  }
}
