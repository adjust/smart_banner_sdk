import { SmartBannerViewData } from '../types';

import styles from './styles.module.scss';

export class ActionButton {
  private link: HTMLAnchorElement;

  constructor(private banner: SmartBannerViewData, private href: string) {
    this.link = document.createElement('a');
  }

  public render(root: HTMLElement) {
    this.link.className = styles.action;
    this.link.innerText = this.banner.buttonLabel;
    this.link.href = this.href;

    if (this.banner.buttonColor) {
      // TODO: buttonColor is a color of what? Text? Button itself?
    }

    root.appendChild(this.link);
  }
}
