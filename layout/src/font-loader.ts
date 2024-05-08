import { Font } from './data-types';

export class FontLoader {
  private static cache: Set<string> = new Set;

  static addFontStylesheet(font: Font, root?: HTMLElement) {
    if (this.cache.has(font.family)) {
      return;
    }

    const parent = root || document.head;
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = font.source;

    parent.appendChild(link);
    this.cache.add(font.family);
  }
}
