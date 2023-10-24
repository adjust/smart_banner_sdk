import { SmartBannerData } from '@sdk/data/types';
import { InMemoryStorage } from '@sdk/data/storage/in-memory-storage';
import { DismissHandler } from '@sdk/domain/dismiss-handler';
import { DismissedFilter } from '@sdk/domain/banners-filter/dismissed-filter';

describe('DismissedFilter tests', () => {
  const dismissalPeriodInSeconds = 60;
  const dismissalPeriod = dismissalPeriodInSeconds * 1000;

  const neverDismissedBanner = {
    id: 'never-dismissed-banner',
    dismissal_period: dismissalPeriodInSeconds
  } as SmartBannerData;

  const justDismissedBanner = {
    id: 'just-dismissed-banner',
    dismissal_period: dismissalPeriodInSeconds
  } as SmartBannerData;

  const someTimeAgoDismissedBanner = {
    id: 'some-time-ago-dismissed-banner',
    dismissal_period: dismissalPeriodInSeconds
  } as SmartBannerData;

  const readyToBeShownBanner = {
    id: 'ready-banner',
    dismissal_period: dismissalPeriodInSeconds
  } as SmartBannerData;

  let dismissedFilter: DismissedFilter;

  beforeAll(() => {
    const storage = new InMemoryStorage();
    storage.setItem(justDismissedBanner.id, Date.now() - 1);
    storage.setItem(someTimeAgoDismissedBanner.id, Date.now() - 100);
    storage.setItem(readyToBeShownBanner.id, Date.now() - dismissalPeriod);

    const handler = new DismissHandler(storage);

    dismissedFilter = new DismissedFilter(handler);
  });

  describe('Filtering', () => {
    it('filter out banners those are too early to be shown', () => {
      const actual = dismissedFilter.filter([neverDismissedBanner, someTimeAgoDismissedBanner, justDismissedBanner, readyToBeShownBanner]);
      const expected = [neverDismissedBanner, readyToBeShownBanner];

      expect(actual).toEqual(expected);
    });

    it('does not throw on empty array', () => {
      expect(dismissedFilter.filter([])).toEqual([]);
    });
  });

  describe('getDismissed', () => {
    it('returns banners those were dismissed and those are too early to be shown', () => {
      const actual = dismissedFilter.getDismissed([neverDismissedBanner, someTimeAgoDismissedBanner, justDismissedBanner, readyToBeShownBanner]);
      const expected = [someTimeAgoDismissedBanner, justDismissedBanner];

      expect(actual).toEqual(expected);
    });

    it('does not throw on empty array', () => {
      expect(dismissedFilter.getDismissed([])).toEqual([]);
    });
  });

  describe('Sorting', () => {
    it('sorts banners by date when they should be shown again', () => {
      const actual = dismissedFilter.sort([neverDismissedBanner, someTimeAgoDismissedBanner, justDismissedBanner, readyToBeShownBanner]);
      const expected = [neverDismissedBanner, readyToBeShownBanner, someTimeAgoDismissedBanner, justDismissedBanner];

      expect(actual).toEqual(expected);
    });

    it('does not throw on empty array', () => {
      expect(dismissedFilter.sort([])).toEqual([]);
    });
  });

});

