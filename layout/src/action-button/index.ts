import { SmartBannerViewData } from '../data-types';

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

    if (this.banner.buttonTextColor) {
      this.link.style.color = this.banner.buttonTextColor
    }

    if (this.banner.buttonBackgroundColor) {
      this.link.style.backgroundColor = this.banner.buttonBackgroundColor
    }

    root.appendChild(this.link);
  }

  public update(banner: SmartBannerViewData, trackerUrl: string) {
    this.banner = banner;
    this.trackerUrl = trackerUrl;

    this.link.href = this.trackerUrl;
    this.link.innerText = this.banner.buttonLabel;
  }
}
