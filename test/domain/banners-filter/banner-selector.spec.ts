import { SmartBannerData } from '@sdk/data/types';
import { InMemoryStorage } from '@sdk/data/storage/in-memory-storage';
import { DismissHandler } from '@sdk/domain/dismiss-handler';
import { BannerSelector, NO_DELAY } from '@sdk/domain/banners-filter/banner-selector';

import 'jest-extended';

describe('BannersSelector tests', () => {
  const url = 'some-url';
  const dismissalPeriod = 600;

  //#region Set of test 'banners'

  // Banners matching display_rule 
  const banner1 = { id: 'banner-1', dismissalPeriod, displayRule: url } as SmartBannerData;
  const banner2 = { id: 'banner-2', dismissalPeriod, displayRule: url } as SmartBannerData;
  const dismissedBanner = { id: 'dismissed-banner', dismissalPeriod, displayRule: url } as SmartBannerData;
  // Would be considered as not dismissed if dismissal period has passed
  const dismissedLongAgoBanner = { id: 'banner-to-schedule', dismissalPeriod, displayRule: url } as SmartBannerData;

  // Banners with empty display_rule - default ones
  const defaultBanner1 = { id: 'default-banner-1', dismissalPeriod, displayRule: null } as SmartBannerData;
  const defaultBanner2 = { id: 'default-banner-2', dismissalPeriod, displayRule: null } as SmartBannerData;
  const dismissedDefaultBanner = { id: 'dismissed-default-banner', dismissalPeriod, displayRule: null } as SmartBannerData;

  // Not matching banner
  const nonSuitableBanner = { id: 'non-suitable', dismissalPeriod, displayRule: 'other-url' } as SmartBannerData;

  //#endregion

  // TODO: for possible future refactor: doesn it make sense to inject dismiss date to banner data?
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

    const actual = bannerSelector.next(banners, url);

    expect(actual).not.toBeNull();
    expect(actual?.banner).toBeOneOf(expectedBanners);
    expect(actual?.when).toBe(expectedDateToShow);
  });

  it('returns one of default banner with equal probability if no matching banners present', () => {
    const banners = [defaultBanner1, defaultBanner2, nonSuitableBanner];

    const expectedBanners = [defaultBanner1, defaultBanner2];
    const expectedDateToShow = NO_DELAY;

    const actual = bannerSelector.next(banners, url);

    expect(actual).not.toBeNull();
    expect(actual?.banner).toBeOneOf(expectedBanners);
    expect(actual?.when).toBe(expectedDateToShow);
  });

  it('returns one of suitable banners and delay to wait until banner could be shown', () => {
    const banners = [defaultBanner1, banner1, dismissedBanner, dismissedLongAgoBanner, nonSuitableBanner];

    const expectedBanners = [banner1, dismissedBanner, dismissedLongAgoBanner];
    const expectedDateToShow = justDismissedDate + dismissedBanner.dismissalPeriod;

    const actual = bannerSelector.next(banners, url);

    expect(actual).not.toBeNull();
    expect(actual?.banner).toBeOneOf(expectedBanners);
    expect(actual?.when).toBe(expectedDateToShow);
  });

  it('returns one of default banners and delay to wait until banner could be shown', () => {
    const banners = [dismissedDefaultBanner, defaultBanner1, defaultBanner2, nonSuitableBanner];

    const expectedBanners = [dismissedDefaultBanner, defaultBanner1, defaultBanner2];
    const expectedDateToShow = justDismissedDate + dismissedDefaultBanner.dismissalPeriod;

    const actual = bannerSelector.next(banners, url);

    expect(actual).not.toBeNull();
    expect(actual?.banner).toBeOneOf(expectedBanners);
    expect(actual?.when).toBe(expectedDateToShow);
  });

  it('returns null if no suitable and default banners present', () => {
    const banners = [nonSuitableBanner];

    expect(bannerSelector.next(banners, url)).toBeNull();
  });

  it('does not throw if array is empty and returns null', () => {
    expect(bannerSelector.next([], url)).toBeNull();
  });

});

