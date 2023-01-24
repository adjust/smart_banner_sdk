import { Utils } from '@test-utils';
import { Logger } from '../src/logger';
import * as Api from '../src/api';
import * as DetectOS from '../src/utils/detect-os';
import { StorageFactory } from '../src/storage/factory';
import { LocalStorage } from '../src/storage/local-storage';
import { SmartBanner } from '../src/smart-banner';

jest.mock('../src/logger');

jest.useFakeTimers();

const storage = new LocalStorage;
jest.spyOn(StorageFactory, 'createStorage').mockImplementation(() => storage);

describe('Smart Banner tests', () => {
  const webToken = 'abc123';
  const defaultDismissInterval = 60 * 60 * 1000; // 1 hour in millis
  const platform = DetectOS.DeviceOS.iOS;
  const bannerData: Api.SmartBannerData = {
    appId: 'none',
    appName: 'Adjust Web SDK',
    header: 'Adjust Smart Banners',
    description: 'Not so smart actually, but deeplinks do the magic anyway',
    buttonText: 'Let\'s go!',
    dismissInterval: defaultDismissInterval,
    position: Api.Position.Top,
    trackerToken: 'abcd'
  };
  const onCreatedCallbackSpy = jest.fn();
  const onDismissedCallbackSpy = jest.fn();

  let smartBanner: SmartBanner;

  beforeAll(() => {
    jest.spyOn(document, 'createElement');
    jest.spyOn(Logger, 'log');
    jest.spyOn(Logger, 'error');
    jest.spyOn(global, 'setTimeout');

    smartBanner = new SmartBanner({ webToken, onCreated: onCreatedCallbackSpy, onDismissed: onDismissedCallbackSpy });
  });

  beforeEach(() => {
    jest.spyOn(DetectOS, 'getDeviceOS').mockReturnValue(platform);
    jest.spyOn(Api, 'fetchSmartBannerData').mockResolvedValue(bannerData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initialisation', () => {

    afterEach(() => {
      smartBanner["destroy"]();
    });

    it(('initialises and renders banner'), async () => {
      expect.assertions(5);

      smartBanner["init"](webToken);
      await Utils.flushPromises(); // resolves data fetch promise that allows initialisation to finish

      expect(Logger.log).toHaveBeenCalledWith('Creating Smart Banner');
      expect(document.createElement).toHaveBeenCalled();
      expect(smartBanner["view"]).not.toBeNull();
      expect(Logger.log).toHaveBeenCalledWith('Smart Banner created');
      expect(onCreatedCallbackSpy).toHaveBeenCalled();
    });

    describe('can not call init repeatedly', () => {
      it('initialisation in progress', async () => {
        expect.assertions(2);

        smartBanner["init"](webToken); // setup

        smartBanner["init"](webToken);

        expect(Logger.error).toHaveBeenCalledWith('Smart Banner is initialising already');

        await Utils.flushPromises(); // tear down

        expect(onCreatedCallbackSpy).toHaveBeenCalledTimes(1);
      });

      it('initialisation finished', async () => {
        expect.assertions(2);

        smartBanner["init"](webToken); // setup
        await Utils.flushPromises(); // allow initialisation to finish

        smartBanner["init"](webToken);

        expect(Logger.error).toHaveBeenCalledWith('Smart Banner is created already');
        expect(onCreatedCallbackSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('logs message when no banner for platform', async () => {
      jest.spyOn(Api, 'fetchSmartBannerData').mockResolvedValueOnce(null);

      expect.assertions(2);

      smartBanner["init"](webToken);
      await Utils.flushPromises();

      expect(Logger.log).toHaveBeenCalledWith(`No Smart Banners for ${platform} platform found`);
      expect(onCreatedCallbackSpy).not.toHaveBeenCalled();
    });

    it('logs message when no target platform', () => {
      jest.spyOn(DetectOS, 'getDeviceOS').mockReturnValueOnce(undefined);

      smartBanner["init"](webToken);

      expect(Logger.log).toHaveBeenCalledWith('This platform is not one of the targeting ones, Smart Banner will not be shown');
      expect(onCreatedCallbackSpy).not.toHaveBeenCalled();
    });
  });

  describe('hide and show', () => {
    beforeAll(() => {
      jest.spyOn(smartBanner, 'hide');
      jest.spyOn(smartBanner, 'show');
    });

    describe('Smart Banner initialised', () => {
      beforeEach(() => {
        smartBanner["init"](webToken);
        return Utils.flushPromises() // resolves data fetch promise that allows initialisation to finish
          .then(() => {
            jest.spyOn(smartBanner["view"]!, 'hide');
            jest.spyOn(smartBanner["view"]!, 'show');
          });
      });

      afterEach(() => {
        smartBanner["destroy"]();
      });

      it('hides banner', () => {
        smartBanner.hide();

        expect(smartBanner["view"]!.hide).toHaveBeenCalled();
      });

      it('shows banner', () => {
        smartBanner.show();

        expect(smartBanner["view"]!.show).toHaveBeenCalled();
      });
    });

    describe('Smart Banner is still initialising', () => {
      afterEach(() => {
        smartBanner["destroy"]();
        jest.clearAllMocks();
      });

      it('logs a message when `.hide()` called and hides the banner when initialisation finished', async () => {
        expect.assertions(3);

        smartBanner["init"](webToken);
        smartBanner.hide();

        expect(Logger.log).toHaveBeenCalledWith('Smart Banner will be hidden after initialisation finished');

        await Utils.flushPromises(); // resolves data fetch promise that allows initialisation to finish

        expect(Logger.log).toHaveBeenCalledWith('Initialisation finished, hide Smart Banner now');
        expect(smartBanner.hide).toHaveBeenCalledTimes(2);
      });

      it('logs a message when `.show()` called and shows the banner when initialisation finished', async () => {
        expect.assertions(3);

        smartBanner["init"](webToken);
        smartBanner.show();

        expect(Logger.log).toHaveBeenCalledWith('Smart Banner will be shown after initialisation finished');

        await Utils.flushPromises(); // resolves data fetch promise that allows initialisation to finish

        expect(Logger.log).toHaveBeenCalledWith('Initialisation finished, show Smart Banner now');
        expect(smartBanner.show).toHaveBeenCalledTimes(2);
      });
    });

    describe('Smart Banner was not initialised', () => {
      it('logs an error when hide called', () => {
        smartBanner.hide();

        expect(Logger.error).toHaveBeenCalledWith('There is no Smart Banner to hide, have you called initialisation?');
      });

      it('logs an error when show called', () => {
        smartBanner.show();

        expect(Logger.error).toHaveBeenCalledWith('There is no Smart Banner to show, have you called initialisation?');
      });
    });
  });

  describe('dismiss', () => {
    const now = Date.now();

    beforeAll(() => {
      jest.spyOn(Date, 'now').mockReturnValue(now);
      jest.spyOn(storage, 'setItem');
      jest.spyOn(smartBanner, <never>'init');
      jest.spyOn(smartBanner, <never>'destroy');
    });

    beforeEach(() => {
      smartBanner["init"](webToken);
      return Utils.flushPromises()
        .then(() => {
          jest.clearAllMocks();

          smartBanner["dismiss"](webToken, defaultDismissInterval);
        });
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('banner removed from DOM when dismissed', () => {
      expect.assertions(8);

      expect(storage.setItem).toHaveBeenCalledWith(smartBanner["STORAGE_KEY_DISMISSED"], now); // add timestamp in Local Storage

      expect(Logger.log).toHaveBeenCalledWith('Smart Banner dismissed');
      expect(smartBanner["destroy"]).toHaveBeenCalled();

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), defaultDismissInterval); // next initialisation scheduled
      expect(Logger.log).toHaveBeenCalledWith('Smart Banner creation scheduled on ' + new Date(now + defaultDismissInterval));

      expect(Logger.log).toHaveBeenCalledWith('Smart Banner removed'); // banner removed from DOM
      expect(smartBanner["view"]).toBeNull();

      expect(onDismissedCallbackSpy).toHaveBeenCalled();
    });

    it('intialisation reschedules banner display when dismiss interval has not over', async () => {
      expect.assertions(6);

      smartBanner["init"](webToken);
      await Utils.flushPromises();

      expect(Logger.log).toHaveBeenCalledWith('Smart Banner was dismissed');
      expect(Logger.log).toHaveBeenCalledWith('Clearing previously scheduled creation of Smart Banner');

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), defaultDismissInterval); // initialisation scheduled
      expect(Logger.log).toHaveBeenCalledWith('Smart Banner creation scheduled on ' + new Date(now + defaultDismissInterval));

      expect(onCreatedCallbackSpy).not.toHaveBeenCalled();
      expect(onDismissedCallbackSpy).toHaveBeenCalledTimes(1);
    });

    it('banner is displayed again when dismiss interval is over', async () => {
      expect.assertions(6);

      jest.spyOn(Date, 'now').mockReturnValue(now + defaultDismissInterval);
      jest.advanceTimersByTime(defaultDismissInterval);

      expect(smartBanner["init"]).toHaveBeenCalled();

      await Utils.flushPromises();

      expect(Logger.log).toHaveBeenCalledWith('Creating Smart Banner');
      expect(document.createElement).toHaveBeenCalled();
      expect(smartBanner["view"]).not.toBeNull();
      expect(Logger.log).toHaveBeenCalledWith('Smart Banner created');
      expect(onCreatedCallbackSpy).toHaveBeenCalled();

      smartBanner["destroy"]();
    });
  });
});
