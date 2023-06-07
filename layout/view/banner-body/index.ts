import { ActionButton } from '../action-button';
import { AppIcon } from '../app-icon';
import { DismissButton } from '../dismiss-button';
import { SmartBannerViewData } from '../types';

import styles from './styles.module.scss';

export class BannerBody {
  private dismissButton: DismissButton;
  private appIcon: AppIcon;
  private actionButton: ActionButton;
  private title: HTMLElement;
  private description: HTMLElement;

  constructor(private banner: SmartBannerViewData, trackerUrl: string, onDismiss: () => void) {
    this.dismissButton = new DismissButton(onDismiss);
    this.appIcon = new AppIcon(banner.iconUrl, ''); // There is app name in data for now
    this.actionButton = new ActionButton(banner, trackerUrl);

    this.title = document.createElement('h4');
    this.description = document.createElement('p');
  }

  private renderTitle() {
    this.title.className = styles['banner-text'];
    this.title.innerText = this.banner.title;

    if (this.banner.titleColor) {
      this.title.style.color = this.banner.titleColor;
    }

    return this.title;
  }

  private renderDescription() {
    this.description.className = styles['banner-text'];
    this.description.innerText = this.banner.description;

    if (this.banner.descriptionColor) {
      this.description.style.color = this.banner.descriptionColor;
    }

    return this.description;
  }

  private renderInnerElements() {
    const container = document.createElement('div');
    container.className = styles.container;

    this.dismissButton.render(container);

    this.appIcon.render(container);

    const textContainer = document.createElement('div');
    textContainer.className = styles['text-container'];
    textContainer.append(this.renderTitle(), this.renderDescription());
    container.appendChild(textContainer);

    this.actionButton.render(container);

    return container;
  }

  public render(root: HTMLElement) {
    const bannerBody = document.createElement('div');
    bannerBody.className = styles['banner-body'];

    if (this.banner.backgroundColor) {
      bannerBody.style.backgroundColor = this.banner.backgroundColor;
    }

    bannerBody.appendChild(this.renderInnerElements());

    root.appendChild(bannerBody);
  }

  public update(banner: SmartBannerViewData, trackerUrl: string) {
    this.banner = banner;

    this.appIcon.update(banner.iconUrl, '');
    this.actionButton.update(banner, trackerUrl);

    this.title.innerText = this.banner.title;
    this.description.innerText = this.banner.description;
  }

  public destroy() {
    this.dismissButton.destroy();
  }
}
