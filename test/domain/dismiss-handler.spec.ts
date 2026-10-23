import { SmartBannerData } from '@sdk/data/types';
import { InMemoryStorage } from '@sdk/data/storage/in-memory-storage';
import { DismissHandler } from '@sdk/domain/dismiss-handler';

describe('DismissHandler tests', () => {
  const dismissalPeriodInSeconds = 60;
  const dismissalPeriod = dismissalPeriodInSeconds * 1000;

  const dismissedBanner = {
    id: 'dismissed-banner',
    dismissal_period: dismissalPeriodInSeconds
  } as SmartBannerData;

  const readyToShowBanner = {
    id: 'ready-banner',
    dismissal_period: dismissalPeriodInSeconds
  } as SmartBannerData;

  const neverDismissedBanner = {
    id: 'another-banner',
    dismissal_period: dismissalPeriodInSeconds
  } as SmartBannerData;

  let dismissHandler: DismissHandler;
  let storage: InMemoryStorage;
  const now = Date.now();

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(now);

    storage = new InMemoryStorage();
    storage.setItem(dismissedBanner.id, now);
    storage.setItem(readyToShowBanner.id, now - dismissalPeriod);

    dismissHandler = new DismissHandler(storage);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Getting a date of next show', () => {
    it('returns a proper date for dismissed banners', () => {
      expect(dismissHandler.getDateToShowAgain(dismissedBanner)).toEqual(now + dismissalPeriod);
      expect(dismissHandler.getDateToShowAgain(readyToShowBanner)).toEqual(now);
    });

    it('returns current date for non-dismissed banner', () => {
      expect(dismissHandler.getDateToShowAgain(neverDismissedBanner)).toEqual(Date.now());
    });
  });

  describe('Detecting if banner was dismissed', () => {
    it('returns true for a just dismissed banner', () => {
      expect(dismissHandler.isDismissed(dismissedBanner)).toEqual(true);
    });

    it('returns false for dismissed banner which is could be shown again', () => {
      expect(dismissHandler.isDismissed(readyToShowBanner)).toEqual(false);
    });

    it('returns false for non-dismissed banner', () => {
      expect(dismissHandler.isDismissed(neverDismissedBanner)).toEqual(false);
    });
  });

  describe('Dismiss functionality', () => {
    beforeAll(() => {
      jest.spyOn(storage, 'setItem');
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('writes current date when dismissing a banner', () => {
      const banner = {
        id: 'some-id',
        dismissal_period: 60
      } as SmartBannerData;

      dismissHandler.dismiss(banner);

      expect(storage.setItem).toHaveBeenCalledWith('some-id', Date.now());
    });
  });

  describe('Schedule functionality', () => {
    const maxTimeoutDelay = 2_147_483_647;

    beforeAll(() => {
      jest.useFakeTimers();
      jest.spyOn(Date, 'now').mockReturnValue(now);
    });

    beforeEach(() => {
      jest.spyOn(global, 'setTimeout');
      jest.spyOn(global, 'clearTimeout');
      jest.spyOn(storage, 'removeItem');

      storage.setItem(banner.id, now);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    const banner = {
      id: 'some-id',
      dismissal_period: 60
    } as SmartBannerData;

    it('schedules next banner creation', () => {
      dismissHandler.schedule(banner, jest.fn(), Date.now() + dismissalPeriod);

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), dismissalPeriod);
    });

    it('calls banner creation function and removes a record from storage', () => {
      const bannerCreationCallback = jest.fn();
      dismissHandler.schedule(banner, bannerCreationCallback, Date.now() + dismissalPeriod);

      jest.advanceTimersByTime(dismissalPeriod);

      expect(bannerCreationCallback).toHaveBeenCalled();
      expect(storage.removeItem).toHaveBeenCalledWith(banner.id);
    });

    it('reschedules a creation that is beyond the maximum timeout delay', () => {
      const bannerCreationCallback = jest.fn();
      const when = now + maxTimeoutDelay + 100;

      dismissHandler.schedule(banner, bannerCreationCallback, when);

      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), maxTimeoutDelay);

      (Date.now as jest.Mock).mockReturnValue(now + maxTimeoutDelay);
      const firstTimerCallback = jest.mocked(setTimeout).mock.calls[0][0];
      firstTimerCallback();

      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
      expect(bannerCreationCallback).not.toHaveBeenCalled();
      expect(storage.removeItem).not.toHaveBeenCalled();
    });

    it('clears previously scheduled banner when scheduling another one', () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();

      dismissHandler.schedule(banner, fn1, Date.now() + dismissalPeriod);
      dismissHandler.schedule(banner, fn2, Date.now() + dismissalPeriod);

      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(clearTimeout).toHaveBeenCalled();

      jest.advanceTimersByTime(dismissalPeriod);

      expect(fn1).not.toHaveBeenCalled();
      expect(fn2).toHaveBeenCalled();
    });
  });

});
