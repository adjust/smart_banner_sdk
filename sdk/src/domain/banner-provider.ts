import { Repository } from '../data/repositories/repository';
import { SmartBannerData } from '../data/types';
import { BannerSelector } from './banners-filter/banner-selector';

/**
 * Fetches banners from Repository and selects a matching one with BannerSelector
 */
export class BannerProvider {
  private gettingBannerPromise: Promise<{ banner: SmartBannerData, when: number } | null> | null = null;
  private selectedBanner: { banner: SmartBannerData, when: number } | null = null;

  constructor(private appToken: string, private repository: Repository<string, SmartBannerData[]>, private selector: BannerSelector) { }

  /**
   * Fetches banners, selects one of suitable ones and returns it with a timestamp when the banner should be shown, if
   * timestamp is negative, then the banners should be shown immediately.
   * If there is no suitable banners then returns null.
   */
  public fetchBanner(url: string): Promise<{ banner: SmartBannerData, when: number } | null> {
    if (this.gettingBannerPromise) {
      return this.gettingBannerPromise;
    }

    this.gettingBannerPromise = this.repository.fetch(this.appToken)
      .then(bannersList => {
        if (!bannersList) {
          return null;
        }

        this.selectedBanner = this.selector.next(bannersList, url);

        return this.selectedBanner;
      })
      .finally(() => {
        this.gettingBannerPromise = null;
      });

    return this.gettingBannerPromise;
  }

  public get isLoading() {
    return this.gettingBannerPromise !== null;
  }

  public get banner() {
    return this.selectedBanner;
  }
}
