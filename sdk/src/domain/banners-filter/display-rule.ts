import { SmartBannerData } from '../../data/types';

export class DisplayRule {

  /**
   * Filters out banners those doesn't match current url. Returns default banners (with empty display_rule) if there
   * are no matching ones.
   */
  public filter(array: SmartBannerData[], url: string): SmartBannerData[] {
    const matchingNonDefault = array.filter(it => {
      if (!it.displayRule) {
        return false; // it's a default banner, ignoring it now
      }

      const regex = new RegExp(it.displayRule, 'i');
      return regex.test(url);
    });

    if (matchingNonDefault.length > 0) {
      return matchingNonDefault;
    }

    // Nothing found, return default banners
    return array.filter(it => !it.displayRule);
  }

  /**
   * Prefers banners with non-empty display_rule
   */
  public sort(array: SmartBannerData[]): SmartBannerData[] {
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
