import { PlacementCondition, SmartBannerData } from '@sdk/data/types';
import { InMemoryStorage } from '@sdk/data/storage/in-memory-storage';
import { DismissHandler } from '@sdk/domain/dismiss-handler';
import { BannerSelector, NO_DELAY } from '@sdk/domain/banners-filter/banner-selector';

import 'jest-extended';

describe('BannersSelector tests', () => {
  const defaultUrl = 'some-url';
  const dismissalPeriodInSeconds = 60;
  const dismissalPeriod = dismissalPeriodInSeconds * 1000;

  const createBannerData = (id: string, url: string | null = defaultUrl, dismissalPeriod: number = dismissalPeriodInSeconds) => {
    const displayRules = url === null ? null : {
      operator: 'or',
      rules: [url]
    } as PlacementCondition;

    return {
      id,
      dismissal_period: dismissalPeriod,
      display_rules: displayRules
    } as SmartBannerData;
  };

  //#region Set of test 'banners'

  // Banners matching display_rule 
  const banner1 = createBannerData('banner-1');
  const banner2 = createBannerData('banner-2');
  const dismissedBanner = createBannerData('dismissed-banner');
  // Would be considered as not dismissed if dismissal period has passed
  const dismissedLongAgoBanner = createBannerData('banner-to-schedule');

  // Banners with empty display_rule - default ones
  const defaultBanner1 = createBannerData('default-banner-1', null);
  const defaultBanner2 = createBannerData('default-banner-2', null);
  const dismissedDefaultBanner = createBannerData('dismissed-default-banner', null);

  // Not matching banner
  const nonSuitableBanner = createBannerData('non-suitable', 'other-url');

  //#endregion

  const longAgoDismissedDate = Date.now() - dismissalPeriod - 100;
  const justDismissedDate = Date.now() - 1;

  let dismissHandler: DismissHandler;
  let bannerSelector: BannerSelector;

  beforeAll(() => {
    const storage = new InMemoryStorage();
    storage.setItem(dismissedDefaultBanner.id, justDismissedDate);
    storage.setItem(dismissedBanner.id, justDismissedDate);
    storage.setItem(dismissedLongAgoBanner.id, longAgoDismissedDate);
    dismissHandler = new DismissHandler(storage);

    bannerSelector = new BannerSelector(dismissHandler);
  });

  it('returns one of matching banner with equal probability', () => {
    const banners = [defaultBanner1, defaultBanner2, banner1, banner2, nonSuitableBanner];

    const expectedBanners = [banner1, banner2];
    const expectedDateToShow = NO_DELAY;

    const actual = bannerSelector.next(banners, defaultUrl);

    expect(actual).not.toBeNull();
    expect(actual?.banner).toBeOneOf(expectedBanners);
    expect(actual?.when).toBe(expectedDateToShow);
  });

  it('returns one of default banner with equal probability if no matching banners present', () => {
    const banners = [defaultBanner1, defaultBanner2, nonSuitableBanner];

    const expectedBanners = [defaultBanner1, defaultBanner2];
    const expectedDateToShow = NO_DELAY;

    const actual = bannerSelector.next(banners, defaultUrl);

    expect(actual).not.toBeNull();
    expect(actual?.banner).toBeOneOf(expectedBanners);
    expect(actual?.when).toBe(expectedDateToShow);
  });

  it('returns one of suitable banners and delay to wait until banner could be shown', () => {
    const banners = [defaultBanner1, banner1, dismissedBanner, dismissedLongAgoBanner, nonSuitableBanner];

    const expectedBanners = [banner1, dismissedBanner, dismissedLongAgoBanner];
    const expectedDateToShow = justDismissedDate + dismissalPeriod;

    const actual = bannerSelector.next(banners, defaultUrl);

    expect(actual).not.toBeNull();
    expect(actual?.banner).toBeOneOf(expectedBanners);
    expect(actual?.when).toBe(expectedDateToShow);
  });

  it('returns one of default banners and delay to wait until banner could be shown', () => {
    const banners = [dismissedDefaultBanner, defaultBanner1, defaultBanner2, nonSuitableBanner];

    const expectedBanners = [dismissedDefaultBanner, defaultBanner1, defaultBanner2];
    const expectedDateToShow = justDismissedDate + dismissalPeriod;

    const actual = bannerSelector.next(banners, defaultUrl);

    expect(actual).not.toBeNull();
    expect(actual?.banner).toBeOneOf(expectedBanners);
    expect(actual?.when).toBe(expectedDateToShow);
  });

  it('returns null if no suitable and default banners present', () => {
    const banners = [nonSuitableBanner];

    expect(bannerSelector.next(banners, defaultUrl)).toBeNull();
  });

  it('does not throw if array is empty and returns null', () => {
    expect(bannerSelector.next([], defaultUrl)).toBeNull();
  });

});

