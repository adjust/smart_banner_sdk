import { SmartBannerViewData, Position } from './data-types';
import { BannerBody } from './banner-body';

import styles from './styles.module.scss';

export interface SmartBannerLayout {
  render: (parent?: HTMLElement) => void;
  update: (banner: SmartBannerViewData, trackerUrl?: string) => void;
  show: () => void;
  hide: () => void;
  destroy: () => void;
}

// eslint-disable-next-line 
const emptyHandler = () => { };

export class SmartBannerView implements SmartBannerLayout {
  private root: HTMLElement;
  private placeholder: HTMLElement | null = null;
  private bannerBody: BannerBody;

  /**
   * @deprecated Please don't create this class directly anymore. Instead use SmartBannerLayoutFactory.createPreview method.
   */
  constructor(private banner: SmartBannerViewData, trackerUrl = '', onDismiss: () => void = emptyHandler) {
    this.root = document.createElement('div');
    this.bannerBody = new BannerBody(banner, onDismiss, trackerUrl);
  }

  public update(banner: SmartBannerViewData, trackerUrl = '') {
    this.banner = banner;

    this.bannerBody.update(banner, trackerUrl);
  }

  public render(parent: HTMLElement = document.body) {
    let bannerStyles = styles.banner;

    const customParent = parent !== document.body;
    if (customParent) {
      bannerStyles = `${bannerStyles} ${styles['custom-parent']}`;
    } else {
      parent = document.body;
      this.placeholder = document.createElement('div');
      this.placeholder.className = styles['banner-placeholder'];
    }

    const positionStyle = this.banner.position === Position.Top ? styles.stickyToTop : styles.stickyToBottom;
    this.root.className = bannerStyles = `${bannerStyles} ${positionStyle}`;

    this.bannerBody.render(this.root);

    if (this.banner.position === Position.Top) {
      parent.insertBefore(this.root, parent.firstChild);
      if (this.placeholder) {
        parent.insertBefore(this.placeholder, parent.firstChild);
      }
    } else {
      parent.appendChild(this.root);
      if (this.placeholder) {
        parent.appendChild(this.placeholder);
      }
    }
  }

  public show() {
    this.root.hidden = false;

    if (this.placeholder) {
      this.placeholder.hidden = false;
    }
  }

  public hide() {
    this.root.hidden = true;

    if (this.placeholder) {
      this.placeholder.hidden = true;
    }
  }

  public destroy() {
    this.bannerBody.destroy();
    this.root.remove();
    if (this.placeholder) {
      this.placeholder.remove();
    }
  }
}
