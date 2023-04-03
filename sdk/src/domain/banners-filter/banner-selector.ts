import { SmartBannerData } from '../../data/api';
import { DisplayRule } from './display-rule';
import { DismissedFilter } from './dismissed-filter';
import { DismissHandler } from '../dismiss-handler';

export class BannerSelector {
  private displayRule: DisplayRule;
  private dismissedFilter: DismissedFilter;

  constructor(private dismissHandler: DismissHandler) {
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
   * Returns next suitable banner and a number of seconds to wait until show the banner
   */
  public next(banners: SmartBannerData[], url: string): { banner: SmartBannerData, schedule: number } | null {
    const suitableBanners = this.getSuitableBanners(banners, url);

    if (suitableBanners.length <= 0) {
      return null;
    }

    let delay = -1;
    const dismissed = this.dismissedFilter.getDismissed(suitableBanners);
    if (dismissed.length > 0) {
      const sortedDismissed = this.dismissedFilter.sort(dismissed);
      delay = this.dismissHandler.getDateToShowAgain(sortedDismissed[0])
    }

    return {
      banner: this.getRandomFromArray(suitableBanners), // Show any banner with equal probability
      schedule: delay // Or schedule the banner if any banner for this page was dismissed 
    };
  }
}
