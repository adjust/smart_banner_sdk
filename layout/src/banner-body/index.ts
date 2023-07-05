import { ActionButton } from '../action-button';
import { AppIcon } from '../app-icon';
import { DismissButton } from '../dismiss-button';
import { SmartBannerViewData } from '../data-types';

import styles from './styles.module.scss';

export class BannerBody {
  private dismissButton: DismissButton;
  private appIcon: AppIcon;
  private actionButton: ActionButton;
  private bannerBody: HTMLElement;
  private title: HTMLElement;
  private description: HTMLElement;

  constructor(private banner: SmartBannerViewData, onDismiss: () => void, trackerUrl?: string) {
    this.dismissButton = new DismissButton(onDismiss, banner.dismissalButtonColor);
    this.appIcon = new AppIcon(banner.iconUrl, banner.appName);
    this.actionButton = new ActionButton(banner, trackerUrl);

    this.bannerBody = document.createElement('div');
    this.bannerBody.className = styles['banner-body'];

    this.title = document.createElement('h4');
    this.title.className = styles['banner-text'];

    this.description = document.createElement('p');
    this.description.className = styles['banner-text'];
  }

  private renderBannerBody(backgroundColor?: string, _backgroundImageUrl?: string) {
    // TODO implement image background

    if (backgroundColor) {
      this.bannerBody.style.backgroundColor = backgroundColor;
    }
  }

  private renderTitle(text: string, color?: string) {
    this.title.innerText = text;

    if (color) {
      this.title.style.color = color;
    }

    return this.title;
  }

  private renderDescription(text?: string, color?: string) {
    this.description.innerText = text || ''; // FIXME: don't render empty text

    if (color) {
      this.description.style.color = color;
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
    textContainer.append(
      this.renderTitle(this.banner.title, this.banner.titleColor),
      this.renderDescription(this.banner.description, this.banner.descriptionColor)
    );

    container.appendChild(textContainer);

    this.actionButton.render(container);

    return container;
  }

  public render(root: HTMLElement) {
    this.renderBannerBody(this.banner.backgroundColor, this.banner.backgroundImageUrl);

    this.bannerBody.appendChild(this.renderInnerElements());

    root.appendChild(this.bannerBody);
  }

  public update(banner: SmartBannerViewData, trackerUrl: string) {
    this.banner = banner;

    this.dismissButton.update(banner.dismissalButtonColor);
    this.appIcon.update(banner.iconUrl, banner.appName);
    this.actionButton.update(banner, trackerUrl);
    this.renderTitle(banner.title, banner.titleColor);
    this.renderDescription(banner.description, banner.descriptionColor);
    this.renderBannerBody(banner.backgroundColor, banner.backgroundImageUrl);
  }

  public destroy() {
    this.dismissButton.destroy();
  }
}
