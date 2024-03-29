import { SmartBannerViewData } from '../data-types';

import styles from './styles.module.scss';

export class ActionButton {
  private link: HTMLAnchorElement;

  constructor(private banner: SmartBannerViewData, private trackerUrl: string = '') {
    this.link = document.createElement('a');

    // In a case when banner in an iframe rendered, open a link in current window instead of the iframe
    this.link.target = '_top';
  }

  private applyColors() {
    if (this.banner.buttonTextColor) {
      this.link.style.color = this.banner.buttonTextColor;
    }

    if (this.banner.buttonColor) {
      this.link.style.backgroundColor = this.banner.buttonColor;
    }
  }

  private applyUrl() {
    if (this.trackerUrl && this.trackerUrl !== '') {
      this.link.href = this.trackerUrl;
    } else {
      this.link.removeAttribute('href');
    }
  }

  public render(root: HTMLElement) {
    this.link.className = styles.action;
    this.link.innerText = this.banner.buttonText;

    this.applyUrl();
    this.applyColors();

    root.appendChild(this.link);
  }

  public update(banner: SmartBannerViewData, trackerUrl: string) {
    this.banner = banner;
    this.trackerUrl = trackerUrl;

    this.link.innerText = this.banner.buttonText;

    this.applyUrl();
    this.applyColors();
  }
}
