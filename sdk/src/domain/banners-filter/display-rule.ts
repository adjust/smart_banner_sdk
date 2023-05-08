import { SmartBannerData } from '../../data/api';

export class DisplayRule {
  filter(array: SmartBannerData[], url: string): SmartBannerData[] {
    return array.filter(it => {
      if (!it.displayRule) {
        return true;
      }

      const regex = new RegExp(it.displayRule, 'i');
      return regex.test(url);
    });
  }

  /**
   * Prefers banners with non-empty display_rule
   */
  sort(array: SmartBannerData[]): SmartBannerData[] {
    return array.sort((a, b) => {

      if (!!a.displayRule && !b.displayRule) {
        return -1;
      }

      if (!a.displayRule && !!b.displayRule) {
        return 1;
      }

      return 0;
    });
  }
}
