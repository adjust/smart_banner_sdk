import { SmartBannerViewData, Position, BannerSize } from './data-types';
import { BannerBody } from './banner-body';

import styles from './styles.module.scss';

export interface SmartBannerLayout {
  render: (parent?: HTMLElement) => void;
  update: (banner: SmartBannerViewData, trackerUrl?: string, impressionUrl?: string) => void;
  show: () => void;
  hide: () => void;
  destroy: () => void;
}

export class SmartBannerView implements SmartBannerLayout {
  private root: HTMLElement;
  private placeholder: HTMLElement | null = null;
  private wrapper: HTMLElement | null = null;
  private bannerBody: BannerBody;

  private parent?: HTMLElement;

  // TODO: implement pixel with impression url
  constructor(private data: SmartBannerViewData, trackerUrl: string, impressionUrl: string, onDismiss: () => void) {
    this.root = document.createElement('div');
    this.bannerBody = new BannerBody(data, onDismiss, trackerUrl);
  }

  private applyRootStyles(customParent: boolean) {
    const customParentStyle = customParent ? styles['custom-parent'] : '';
    const positionStyle = this.data.position === Position.Top ? styles.stickyToTop : styles.stickyToBottom;

    this.root.className = `${styles.banner} ${customParentStyle} ${positionStyle} ${this.data.size}`;
  }

  private createCustomParentWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = styles['wrapper'];
  }

  private createPlaceholder() {
    this.placeholder = document.createElement('div');
    this.placeholder.className = styles['banner-placeholder'];
  }

  private attachBannerToParent(parent: HTMLElement) {
    const attach = (child: HTMLElement, parent: HTMLElement, position: Position) => {
      if (position === Position.Top) {
        parent.insertBefore(child, parent.firstChild);
      } else {
        parent.appendChild(child);
      }
    };

    if (this.placeholder) {
      attach(this.placeholder, parent, this.data.position);
    }

    if (this.wrapper) {
      attach(this.root, this.wrapper, this.data.position);
      attach(this.wrapper, parent, this.data.position);
    } else {
      attach(this.root, parent, this.data.position);
    }
  }

  public render(parent: HTMLElement = document.body) {
    this.parent = parent;
    const customParent = this.parent !== document.body;

    this.applyRootStyles(customParent);

    if (customParent) {
      this.createCustomParentWrapper();
    }

    if (!customParent && this.data.size === BannerSize.Small) {
      this.createPlaceholder(); // Trying to push the content
    }

    this.bannerBody.render(this.root);

    this.attachBannerToParent(this.parent);
  }

  // TODO: implement pixel with impression url
  public update(banner: SmartBannerViewData, trackerUrl = '', impressionUrl = '') {
    this.data = banner;

    this.applyRootStyles(this.parent !== document.body);

    this.bannerBody.update(banner, trackerUrl);
  }

  public show() {
    this.root.hidden = false;

    if (this.wrapper) {
      this.wrapper.hidden = false;
    }

    if (this.placeholder) {
      this.placeholder.hidden = false;
    }
  }

  public hide() {
    this.root.hidden = true;

    if (this.wrapper) {
      this.wrapper.hidden = true;
    }

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
