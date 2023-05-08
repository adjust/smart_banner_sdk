import { SmartBannerData } from '../api';

//type AppIconData = Pick<SmartBannerData, 'appId' | 'appName' | 'imageUrl'>

export class AppIcon {
  private appTraceUrl = (appId: string) => `https://www.apptrace.com/api/app/${appId}/artwork_url_small`;

  private appName: string;

  private image: HTMLImageElement;
  private placeholder: HTMLElement;

  constructor(bannerData: SmartBannerData, image: HTMLImageElement, placeholder: HTMLElement) {
    this.image = image;
    this.placeholder = placeholder;
    this.appName = ''; // bannerData.appName;

    const sources = this.getSources(bannerData);
    this.showImage(sources);
  }

  private getSources(bannerData: SmartBannerData): string[] {
    const sourcesArray: string[] = [];

    if (bannerData.iconUrl) {
      sourcesArray.push(bannerData.iconUrl);
    }
    // sourcesArray.push(this.appTraceUrl(bannerData.appId));

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
        this.placeholder.innerText = this.appName.length ? this.appName[0].toUpperCase() : '';
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
