import { SmartBannerData } from '../../data/api';
import styles from './styles.module.scss';

export class AppIcon {
  private placeholder: HTMLElement;
  private image: HTMLImageElement;

  constructor(private banner: SmartBannerData) {
    // create elements in contructor to avoid null-checks in other methods
    this.placeholder = document.createElement('div');
    this.placeholder.className = styles.placeholder;

    this.image = document.createElement('img');
    this.image.className = styles.image;
  }

  public render(root: HTMLElement) {
    const appIcon = document.createElement('div');
    appIcon.className = styles['app-icon'];

    appIcon.append(this.placeholder, this.image);

    const imageSources = this.getSources(this.banner);
    this.showImage(imageSources);

    root.appendChild(appIcon);
  }

  private getSources(banner: SmartBannerData): string[] {
    const sourcesArray: string[] = [];

    if (banner.iconUrl) {
      sourcesArray.push(banner.iconUrl);
    }

    // There is no app_id nor bundle_id nor package_name in data for now
    // sourcesArray.push(`https://www.apptrace.com/api/app/${banner.appId}/artwork_url_small`);

    return sourcesArray;
  }

  private showImage(sources: string[]): Promise<void> {
    const imageLoadingPromise = sources.reduce((acc: Promise<unknown>, url) => {
      return acc.catch(() => this.loadImage(url, this.image));
    }, Promise.reject());

    return imageLoadingPromise
      .then(() => {
        this.placeholder.remove();
      })
      .catch(() => {
        this.image.remove();

        // There is app_name in data for now
        //placeholder.innerText = banner.appName.length ? banner.appName[0].toUpperCase() : '';
      });
  }

  private loadImage(url: string, image: HTMLImageElement): Promise<unknown> {
    return new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = url;
    });
  }
}
