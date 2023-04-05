import { ActionButton } from '../action-button';
import { AppIcon } from '../app-icon';
import { DismissButton } from '../dismiss-button';
import { SmartBannerViewData } from '../types';

import styles from './styles.module.scss';

export class BannerBody {
  private dismissButton: DismissButton;
  private appIcon: AppIcon;
  private actionButton: ActionButton;

  constructor(private banner: SmartBannerViewData, href: string, onDismiss: () => void) {
    this.dismissButton = new DismissButton(onDismiss);
    this.appIcon = new AppIcon(banner);
    this.actionButton = new ActionButton(banner, href);
  }

  private renderTitle() {
    const title = document.createElement('h4');
    title.className = styles['banner-text'];
    title.innerText = this.banner.title;

    if (this.banner.titleColor) {
      title.style.color = this.banner.titleColor;
    }

    return title;
  }

  private renderDescription() {
    const description = document.createElement('p');
    description.className = styles['banner-text'];
    description.innerText = this.banner.description;

    if (this.banner.descriptionColor) {
      description.style.color = this.banner.descriptionColor;
    }

    return description;
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

    if (this.banner.backgoundColor) {
      bannerBody.style.backgroundColor = this.banner.backgoundColor;
    }

    bannerBody.appendChild(this.renderInnerElements());

    root.appendChild(bannerBody);
  }

  public destroy() {
    this.dismissButton.destroy();
    // TODO: for future refactor: most likely it makes sence add destroy method for other components for interface consistency
  }
}
