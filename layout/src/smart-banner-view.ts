import { SmartBannerViewData, Position } from './data-types';
import { BannerBody } from './banner-body';

import styles from './styles.module.scss';

export class SmartBannerView {
  private root: HTMLElement;
  private wrapper: HTMLElement;
  private bannerBody: BannerBody;

  constructor(private banner: SmartBannerViewData, trackerUrl = '', onDismiss = () => { }) {
    this.root = document.createElement('div');
    this.wrapper = document.createElement('div');
    this.bannerBody = new BannerBody(banner, trackerUrl, onDismiss);
  }

  public update(banner: SmartBannerViewData, trackerUrl = '') {
    this.banner = banner;

    this.bannerBody.update(banner, trackerUrl);
  }

  public render(parent: HTMLElement) {
    const positionStyle = this.banner.position === Position.Top ? styles.stickyToTop : styles.stickyToBottom;
    this.root.className = `${styles.banner} ${positionStyle}`;

    this.wrapper.className = styles['banner-placeholder'];
    this.wrapper.appendChild(this.root);

    this.bannerBody.render(this.root);

    if (this.banner.position === Position.Top) {
      parent.insertBefore(this.wrapper, parent.firstChild);
    } else {
      parent.appendChild(this.wrapper);
    }
  }

  public show() {
    this.root.hidden = false;
  }

  public hide() {
    this.root.hidden = true;
  }

  public destroy() {
    this.bannerBody.destroy();
    this.wrapper.remove();
  }
}
