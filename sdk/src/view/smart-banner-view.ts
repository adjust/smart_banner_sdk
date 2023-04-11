import { Position } from '../data/types';
import { SmartBannerViewData } from './types';
import { BannerBody } from './banner-body';

import styles from './styles.module.scss';

export class SmartBannerView {
  private root: HTMLElement;
  private wrapper: HTMLElement;
  private bannerBody: BannerBody;

  constructor(private parent: HTMLElement, private banner: SmartBannerViewData, href: string, onDismiss: () => void) {
    this.root = document.createElement('div');
    this.wrapper = document.createElement('div');
    this.bannerBody = new BannerBody(banner, href, onDismiss);
  }

  public render() {
    const positionStyle = this.banner.position === Position.Top ? styles.stickyToTop : styles.stickyToBottom;
    this.root.className = `${styles.banner} ${positionStyle}`;

    this.wrapper.className = styles['banner-placeholder'];
    this.wrapper.appendChild(this.root);

    this.bannerBody.render(this.root);

    if (this.banner.position === Position.Top) {
      this.parent.insertBefore(this.wrapper, this.parent.firstChild);
    } else {
      this.parent.appendChild(this.wrapper);
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
  }
}
