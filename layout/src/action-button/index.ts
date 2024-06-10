import { SmartBannerViewData } from '../data-types';

import styles from './styles.module.scss';

export class ActionButton {
  private link: HTMLAnchorElement;

  constructor(private banner: SmartBannerViewData, private trackerUrl: string = '') {
    this.link = document.createElement('a');

    // In a case when banner in an iframe rendered, open a link in current window instead of the iframe
    this.link.target = '_top';
  }

  private applyStyle() {
    this.link.style.backgroundColor = this.banner.buttonColor || '';
    this.link.style.color = this.banner.buttonTextColor || '';
    this.link.style.fontFamily = this.banner.buttonFont ? this.banner.buttonFont.family : '';
    this.link.style.fontSize = this.banner.buttonFontSize ? (this.banner.buttonFontSize + 'px') : '';
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
    this.applyStyle();

    root.appendChild(this.link);
  }

  public update(banner: SmartBannerViewData, trackerUrl: string) {
    this.banner = banner;
    this.trackerUrl = trackerUrl;

    this.link.innerText = this.banner.buttonText;

    this.applyUrl();
    this.applyStyle();
  }
}
