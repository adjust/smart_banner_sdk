import { BannerFilter } from './types';
import { SmartBannerData } from '../../data/types';

enum MatchType {
  default,
  matching,
  notMatching
}

export class DisplayRules implements BannerFilter {
  constructor(private url: string) { }

  private match(banner: SmartBannerData): MatchType {
    if (!banner.display_rules) {
      return MatchType.default;
    }

    // TODO recursively check the rules here

    return MatchType.notMatching;
  }

  /**
   * Filters out banners those doesn't match current url. Returns default banners (with empty display_rules) if there
   * are no matching ones.
   */
  public filter(array: SmartBannerData[]): SmartBannerData[] {
    const matchingNonDefault: Array<SmartBannerData> = [];
    const defaultBanners: Array<SmartBannerData> = [];

    array.forEach(it => {
      const match = this.match(it);
      if (match === MatchType.matching) {
        matchingNonDefault.push(it);
      } else if (match === MatchType.default) {
        defaultBanners.push(it);
      }
    })

    if (matchingNonDefault.length > 0) {
      return matchingNonDefault;
    }

    // Nothing found, return default banners
    return defaultBanners;
  }
}
