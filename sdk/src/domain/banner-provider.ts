import { SmartBannerRepository } from '../data/repositories/smart-banner-repository';
import { SmartBannerData } from '../data/types';
import { BannerSelector } from './banners-filter/banner-selector';

/**
 * Fetches banners from SmartBannerRepository and selects a matching one with BannerSelector
 */
export class BannerProvider {
  private gettingBannerPromise: Promise<{ banner: SmartBannerData, when: number } | null> | null = null;
  private selectedBanner: { banner: SmartBannerData, when: number } | null = null;

  constructor(private appToken: string, private url: string, private repository: SmartBannerRepository, private selector: BannerSelector) { }

  /**
   * Selects a suitable banner and returns it accompanied with a timestamp when the banner should be shown. If tim (mignt be negative, then show immediately),
   * or null if there is no suitable banner
   */
  public fetchBanner(): Promise<{ banner: SmartBannerData, when: number } | null> {
    if (this.gettingBannerPromise) {
      return this.gettingBannerPromise
    }

    this.gettingBannerPromise = this.repository.fetch(this.appToken)
      .then(bannersList => {
        if (!bannersList) {
          return null;
        }

        this.selectedBanner = this.selector.next(bannersList, this.url);
        this.gettingBannerPromise = null;

        return this.selectedBanner;
      });

    return this.gettingBannerPromise;
  }

  public get isLoading() {
    return this.gettingBannerPromise !== null
  }

  public get banner() {
    return this.selectedBanner
  }
}
