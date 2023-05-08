import { SmartBannerViewData } from '../types';

import styles from './styles.module.scss';

export class ActionButton {
  private link: HTMLAnchorElement;

  constructor(private banner: SmartBannerViewData, private trackerUrl: string) {
    this.link = document.createElement('a');
  }

  public render(root: HTMLElement) {
    this.link.className = styles.action;
    this.link.innerText = this.banner.buttonLabel;
    this.link.href = this.trackerUrl;

    if (this.banner.buttonColor) {
      // TODO: is buttonColor a color of what? Text? Button border? Background?
    }

    root.appendChild(this.link);
  }
}
