import { SmartBannerData } from 'sdk/src/data/api';
import { DisplayRule } from './display-rule';
import { DismissedFilter } from './dismissed-filter';
import { DismissHandler } from '../dismiss-handler';


export class BannersSelector {
  private displayRule: DisplayRule;
  private dismissedFilter: DismissedFilter;

  constructor(dismissHandler: DismissHandler) {
    this.displayRule = new DisplayRule();
    this.dismissedFilter = new DismissedFilter(dismissHandler);
  }

  /**
   * Get an array of banners which match display_rule
   */
  private getSuitableBanners(banners: SmartBannerData[], url: string) {
    const suitableBanners = this.displayRule.filter(banners, url);
    return this.displayRule.sort(suitableBanners);
  }

  /**
   * Returns next suitable banner and a flag if the banner should be scheduled
   */
  public next(banners: SmartBannerData[], url: string): { banner: SmartBannerData, schedule: boolean } | null {
    const suitableBanners = this.getSuitableBanners(banners, url);

    if (suitableBanners.length <= 0) {
      return null;
    }

    const nonDismissedSuitableBanners = this.dismissedFilter.filter(suitableBanners);

    if (nonDismissedSuitableBanners.length > 0) {

      // Current business logic requires to return any banner from array of suitable ones with equal probability
      const index = Math.floor(Math.random() * nonDismissedSuitableBanners.length);

      return {
        banner: nonDismissedSuitableBanners[index],
        schedule: false
      };
    }

    return {
      banner: this.dismissedFilter.sort(suitableBanners)[0],
      schedule: true
    };
  }
}
