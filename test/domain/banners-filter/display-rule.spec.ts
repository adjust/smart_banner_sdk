import { SmartBannerData } from '@sdk/data/api';
import { DisplayRule } from '@sdk/domain/banners-filter/display-rule';

describe('DisplayRule tests', () => {
  const url = 'some-url';

  const defaultBanners = [{
    id: 'default_1',
    displayRule: null
  } as SmartBannerData, {
    id: 'default_2',
    displayRule: null
  } as SmartBannerData];

  const suitableBanners = [{
    id: 'suitable_1',
    displayRule: 'some-url'
  } as SmartBannerData, {
    id: 'suitable_2',
    displayRule: 'some-url'
  } as SmartBannerData];

  const nonSuitableBanners = [{
    id: 'banner_1',
    displayRule: 'other-url'
  } as SmartBannerData, {
    id: 'banner_2',
    displayRule: 'another-url'
  } as SmartBannerData];

  const displayRule = new DisplayRule();

  describe('Filtering', () => {
    it('returns array of matching banners', () => {
      const array = [...nonSuitableBanners, ...defaultBanners, ...suitableBanners];
      expect(displayRule.filter(array, url)).toEqual(suitableBanners);
    });

    it('returns array of default banners if there is no matching ones', () => {
      expect(displayRule.filter([...nonSuitableBanners, ...defaultBanners], url)).toEqual(defaultBanners);
    });

    it('returns empty array if there is no matching banners neither default ones', () => {
      expect(displayRule.filter(nonSuitableBanners, url)).toEqual([]);
    });

    it('does not throw if banners array is empty', () => {
      expect(displayRule.filter([], url)).toEqual([]);
    });
  });

  describe('Sorting', () => {
    it('moves default banners to the end  of array', () => {
      const array = [...nonSuitableBanners, ...defaultBanners, ...suitableBanners];
      const expected = [...nonSuitableBanners, ...suitableBanners, ...defaultBanners];
      expect(displayRule.sort(array)).toEqual(expected);
    });

    it('does not rearrange if all banners have diplay_rule', () => {
      const array = [...nonSuitableBanners, ...suitableBanners];
      expect(displayRule.sort(array)).toEqual(array);
    });

    it('does not rearrange if all banners are default', () => {
      expect(displayRule.sort(defaultBanners)).toEqual(defaultBanners);
    });

    it('does not throw if banners array is empty', () => {
      expect(displayRule.sort([])).toEqual([]);
    });
  });

});

