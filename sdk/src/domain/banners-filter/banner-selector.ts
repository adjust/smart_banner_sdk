import { Logger } from '@utils/logger';
import { random } from '@utils/random';
import { SmartBannerData } from '../../data/types';
import { DisplayRule } from './regex-display-rule';
import { DismissedFilter } from './dismissed-filter';
import { DismissHandler } from '../dismiss-handler';

export const NO_DELAY = -1;

export class BannerSelector {
  private dismissedFilter: DismissedFilter;

  constructor(private dismissHandler: DismissHandler) {
    this.dismissedFilter = new DismissedFilter(dismissHandler);
  }

  /**
   * Returns next suitable banner and a number of seconds to wait until show the banner
   */
  public next(banners: SmartBannerData[], url: string): { banner: SmartBannerData, when: number } | null {
    const suitableBanners = new DisplayRule(url).filter(banners);

    if (suitableBanners.length <= 0) {
      Logger.log(`No Smart Banners for ${url} page found`);
      return null;
    }

    // If at least one of banners was dismissed, we should wait till 'the oldest' dismissalPeriod passed
    let dateToShow: number | null = null;
    const dismissed = this.dismissedFilter.getDismissed(suitableBanners);
    if (dismissed.length > 0) {
      const sortedDismissed = this.dismissedFilter.sort(dismissed);
      dateToShow = this.dismissHandler.getDateToShowAgain(sortedDismissed[0]);
    }

    return {
      banner: suitableBanners[random(0, suitableBanners.length)], // Show any banner with equal probability
      when: dateToShow || NO_DELAY
    };
  }
}
