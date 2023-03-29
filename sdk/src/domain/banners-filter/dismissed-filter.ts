import { SmartBannerData } from '../../data/api';
import { DismissHandler } from '../dismiss-handler';

export class DismissedFilter {
  constructor(private dismissHandler: DismissHandler) { }

  private getShowDate(banner: SmartBannerData) {
    return this.dismissHandler.getDateToShowAgain(banner);
  }

  public filter(banners: SmartBannerData[]): SmartBannerData[] {
    return banners.filter(banner => !this.dismissHandler.isDismissed(banner));
  }

  public sort(banners: SmartBannerData[]): SmartBannerData[] {
    return banners.sort((a, b) => {
      return this.getShowDate(a) - this.getShowDate(b);
    });
  }
}
