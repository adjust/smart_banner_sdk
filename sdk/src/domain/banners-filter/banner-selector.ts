import { SmartBannerData } from 'sdk/src/data/api';
import { DisplayRule } from './display-rule';
import { DismissedFilter } from './dismissed-filter';
import { DismissHandler } from '../dismiss-handler';


export class BannersSelector {
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

  /**
   * Get the first suitable banner and a flag if it was dismissed
   * 
   * Current business logic requires to show first matching banner or nothing if the first one was dismissed
   */
  public get(banners: SmartBannerData[], url: string): { banner: SmartBannerData, dismissed: boolean } | null {
    const suitableBanners = this.getSuitableBanners(banners, url);

    if (suitableBanners.length <= 0) {
      return null;
    }

    return {
      banner: suitableBanners[0],
      dismissed: this.dismissHandler.isDismissed(suitableBanners[0])
    };
  }

  /**
   * Get a suitable banner to be shown or scheduled
   * 
   * Could be called to get next banner to show after the current one was dismissed
   */
  public next(banners: SmartBannerData[], url: string): { banner: SmartBannerData, dismissed: boolean } | null {
    const suitableBanners = this.getSuitableBanners(banners, url);

    if (suitableBanners.length <= 0) {
      return null;
    }

    const nonDismissedSuitableBanners = this.dismissedFilter.filter(suitableBanners);

    if (nonDismissedSuitableBanners.length > 0) {
      return {
        banner: nonDismissedSuitableBanners[0],
        dismissed: false
      };
    }

    return {
      banner: this.dismissedFilter.sort(suitableBanners)[0],
      dismissed: true
    };
  }
}
