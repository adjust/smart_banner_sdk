import { BannerFilter } from './types';
import { SmartBannerData } from '../../data/types';

export class RegexDisplayRule implements BannerFilter {
  constructor(private url: string) { }

  /**
   * Filters out banners those doesn't match current url. Returns default banners (with empty display_rule) if there
   * are no matching ones.
   */
  public filter(array: SmartBannerData[]): SmartBannerData[] {
    const matchingNonDefault = array.filter(it => {
      if (!it.display_rule) {
        return false; // it's a default banner, ignoring it now
      }

      const regex = new RegExp(it.display_rule, 'i');
      return regex.test(this.url);
    });

    if (matchingNonDefault.length > 0) {
      return matchingNonDefault;
    }

    // Nothing found, return default banners
    return array.filter(it => !it.display_rule);
  }
}
