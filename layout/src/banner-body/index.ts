import { ActionButton } from '../action-button';
import { AppIcon } from '../app-icon';
import { DismissButton } from '../dismiss-button';
import { BannerText, TextType } from '../text';
import { ImpressionPixel } from '../impression-pixel';
import { SmartBannerViewData } from '../data-types';

import styles from './styles.module.scss';

export class BannerBody {
  private dismissButton: DismissButton;
  private appIcon: AppIcon;
  private actionButton: ActionButton;
  private bannerBody: HTMLElement;
  private title: BannerText;
  private description: BannerText;
  private pixel: ImpressionPixel;

  constructor(private banner: SmartBannerViewData, onDismiss: () => void, trackerUrl: string = '', impressionUrl: string = '') {
    this.bannerBody = document.createElement('div');
    this.bannerBody.className = styles['banner-body'];

    this.dismissButton = new DismissButton(onDismiss, banner.dismissalButtonColor);
    this.appIcon = new AppIcon(banner.iconUrl, banner.appName, banner.size);
    this.actionButton = new ActionButton(banner, trackerUrl);

    this.title = new BannerText(
      TextType.Title,
      banner.title,
      {
        color: banner.titleColor,
        fontSize: banner.titleFontSize,
        fontFamily: banner.titleFont?.family
      }
    );

    this.description = new BannerText(
      TextType.Description,
      banner.description,
      {
        color: banner.descriptionColor,
        fontSize: banner.descriptionFontSize,
        fontFamily: banner.descriptionFont?.family
      }
    );

    this.pixel = new ImpressionPixel(impressionUrl);
  }

  private renderBackground(backgroundColor?: string, backgroundImageUrl?: string) {
    if (backgroundColor) {
      this.bannerBody.style.backgroundColor = backgroundColor;
    }

    if (!backgroundImageUrl) {
      this.bannerBody.style.removeProperty('backgroundImage');
    } else if (this.bannerBody.style.backgroundImage !== `url(${backgroundImageUrl})`) {
      // TODO: preload image before show?
      this.bannerBody.style.backgroundImage = `url(${backgroundImageUrl})`;
    }
  }

  private renderInnerElements() {
    const container = document.createElement('div');
    container.className = styles.container;

    this.appIcon.render(container);

    const textContainer = document.createElement('div');
    textContainer.className = styles['text-container'];

    this.title.render(textContainer);
    this.description.render(textContainer);

    container.appendChild(textContainer);

    this.actionButton.render(container);

    return container;
  }

  public render(root: HTMLElement) {
    this.renderBackground(this.banner.backgroundColor, this.banner.backgroundImageUrl);

    this.dismissButton.render(this.bannerBody);

    this.bannerBody.appendChild(this.renderInnerElements());

    this.pixel.render(this.bannerBody);

    root.appendChild(this.bannerBody);
  }

  public update(banner: SmartBannerViewData, trackerUrl: string, impressionUrl?: string) {
    this.dismissButton.update(banner.dismissalButtonColor);
    this.appIcon.update(banner.iconUrl, banner.appName);
    this.actionButton.update(banner, trackerUrl);

    this.title.update(
      banner.title,
      {
        color: banner.titleColor,
        fontSize: banner.titleFontSize,
        fontFamily: banner.titleFont?.family
      }
    );

    this.description.update(
      banner.description,
      {
        color: banner.descriptionColor,
        fontSize: banner.descriptionFontSize,
        fontFamily: banner.descriptionFont?.family
      }
    );

    this.pixel.update(impressionUrl);

    this.renderBackground(banner.backgroundColor, banner.backgroundImageUrl);

    this.banner = banner;
  }

  public destroy() {
    this.dismissButton.destroy();
  }
}
