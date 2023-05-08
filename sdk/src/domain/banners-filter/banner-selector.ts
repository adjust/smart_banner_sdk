import { SmartBannerData } from '../../data/api';
import { DisplayRule } from './display-rule';
import { DismissedFilter } from './dismissed-filter';
import { DismissHandler } from '../dismiss-handler';

export class BannerSelector {
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

  private getRandomFromArray(banners: SmartBannerData[]): SmartBannerData {
    const index = Math.floor(Math.random() * banners.length);
    return banners[index];
  }

  /**
   * Returns next suitable banner and a flag if the banner should be scheduled
   */
  public next(banners: SmartBannerData[], url: string): { banner: SmartBannerData, schedule: boolean } | null {
    const suitableBanners = this.getSuitableBanners(banners, url);

    if (suitableBanners.length <= 0) {
      return null;
    }

    const dismissed = this.dismissedFilter.getDismissed(suitableBanners);

    return {
      banner: this.getRandomFromArray(suitableBanners), // Show any banner with equal probability
      schedule: dismissed.length > 0 // Or schedule the banner if any banner for this page was dismissed 
    };
  }
}
