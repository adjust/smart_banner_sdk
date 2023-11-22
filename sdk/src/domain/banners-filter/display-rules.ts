import { Logger } from '@utils/logger';
import { BannerFilter } from './types';
import { PlacementCondition, SmartBannerData } from '../../data/types';

enum MatchType {
  default,
  matching,
  notMatching
}

export class DisplayRules implements BannerFilter {
  constructor(private url: string) { }

  private and(rules: Array<PlacementCondition | string>): boolean {
    for (const rule of rules) {
      if (typeof rule === 'string') {
        if (!new RegExp(rule, 'i').test(this.url)) {
          return false;  // if at least one rule form rules array doesn't match then the entire condition doesn't match
        }
      } else {
        if (!this.checkRule(rule)) {
          return false; // if at least one rule form rules array doesn't match then the entire condition doesn't match
        }
      }
    }

    return true;  // if every rule form rules array does match then the entire condition does match
  }

  private or(rules: Array<PlacementCondition | string>): boolean {
    for (const rule of rules) {
      if (typeof rule === 'string') {
        if (new RegExp(rule, 'i').test(this.url)) {
          return true; // if at least one rule form rules array does match then the entire condition does match
        }
      } else {
        if (this.checkRule(rule)) {
          return true; // if at least one rule form rules array does match then the entire condition does match
        }
      }
    }

    return false; // if every rule form rules array doesn't match then the entire condition doesn't match
  }

  private checkRule(condition: PlacementCondition): boolean {
    if (condition.operator === 'or') {
      return this.or(condition.rules);
    } else if (condition.operator === 'and') {
      return this.and(condition.rules);
    }

    Logger.warn('Unknown operator ' + condition.operator + ', try to update the SDK.');
    return false;
  }

  private match(banner: SmartBannerData): MatchType {
    if (!banner.display_rules) {
      return MatchType.default;
    }

    if (this.checkRule(banner.display_rules)) {
      return MatchType.matching;
    }

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
    });

    if (matchingNonDefault.length > 0) {
      return matchingNonDefault;
    }

    // Nothing found, return default banners
    return defaultBanners;
  }
}
