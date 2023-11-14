import { SmartBannerData } from '@sdk/data/types';
import { DisplayRule } from '@sdk/domain/banners-filter/regex-display-rule';

describe('DisplayRule tests', () => {
  const url = 'some-url';

  const defaultBanners = [
    { id: 'default_1', display_rule: null },
    { id: 'default_2', display_rule: null }
  ] as SmartBannerData[];

  const suitableBanners = [
    { id: 'suitable_1', display_rule: 'some-url' },
    { id: 'suitable_2', display_rule: 'some-url' }
  ] as SmartBannerData[];

  const nonSuitableBanners = [
    { id: 'banner_1', display_rule: 'other-url' },
    { id: 'banner_2', display_rule: 'another-url' }
  ] as SmartBannerData[];
  describe('Filtering', () => {
    it('returns array of matching banners', () => {
      const array = [...nonSuitableBanners, ...defaultBanners, ...suitableBanners];
      expect((new DisplayRule(url)).filter(array)).toEqual(suitableBanners);
    });

    it('returns array of default banners if there is no matching ones', () => {
      expect((new DisplayRule(url)).filter([...nonSuitableBanners, ...defaultBanners])).toEqual(defaultBanners);
    });

    it('returns empty array if there is no matching banners neither default ones', () => {
      expect((new DisplayRule(url)).filter(nonSuitableBanners)).toEqual([]);
    });

    it('does not throw if banners array is empty', () => {
      expect((new DisplayRule(url)).filter([])).toEqual([]);
    });
  });
});

