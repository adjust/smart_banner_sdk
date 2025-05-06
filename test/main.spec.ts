import { Logger as _Logger, LogLevel } from '@sdk/utils/logger';
import { AppToken, InitialisationOptions } from '@sdk/main';
import * as _SmartBannerModule from '@sdk/domain/smart-banner';
import * as OsDetector from '@sdk/utils/detect-platform';
import _AdjustSmartBanner from '@sdk/main';

jest.doMock('@sdk/domain/smart-banner');
jest.mock('@sdk/utils/logger');

describe('Entry point tests', () => {
  let AdjustSmartBanner: typeof _AdjustSmartBanner;
  let Logger: typeof _Logger;
  let DetectPlatform: typeof OsDetector;
  let SmartBannerModule: typeof _SmartBannerModule;
  const SmartBanner = {
    show: jest.fn(),
    hide: jest.fn(),
    setLanguage: jest.fn(),
    setIosDeepLinkPath: jest.fn(),
    setAndroidDeepLinkPath: jest.fn(),
    setContext: jest.fn(),
  };

  let getPlatformSpy: jest.SpyInstance<OsDetector.Platform | undefined>;

  const platforms = [OsDetector.Platform.iOS, OsDetector.Platform.Android];

  const appToken: AppToken = {
    'android': 'android-token',
    'ios': 'ios-token',
  };

  beforeEach(() => {
    AdjustSmartBanner = require('@sdk/main').default;
    DetectPlatform = require('@sdk/utils/detect-platform');
    SmartBannerModule = require('@sdk/domain/smart-banner');
    Logger = require('@sdk/utils/logger').Logger;

    getPlatformSpy = jest.spyOn(DetectPlatform, 'getPlatform');
    getPlatformSpy.mockReturnValue(OsDetector.Platform.Android);

    jest.spyOn(SmartBannerModule, 'SmartBanner').mockImplementation(() => SmartBanner as any as _SmartBannerModule.SmartBanner);
    jest.spyOn(Logger, 'setLogLevel');
    jest.spyOn(Logger, 'error');
    jest.spyOn(Logger, 'info');
    jest.spyOn(Logger, 'log');
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  describe('Initialisation', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('Initialises Logger', () => {
      it.each(['none', 'verbose', 'info', 'warning', 'error'] as LogLevel[])('picks and applies logLevel: %s', (logLevel) => {
        AdjustSmartBanner.init({ appToken: 'some-token', logLevel: logLevel });

        expect(Logger.setLogLevel).toBeCalledWith(logLevel);
      });

      it('uses default logLevel if no such option', () => {
        AdjustSmartBanner.init({ appToken: 'some-token' });

        expect(Logger.setLogLevel).toBeCalledWith('error');
      });
    });

    describe('Detecting device platform', () => {
      it('prevents initialisation on non-mobile platforms', () => {
        getPlatformSpy.mockReturnValueOnce(undefined);

        AdjustSmartBanner.init({ appToken: 'some-token' });

        expect(Logger.info).toBeCalledWith('This platform is not one of the targeting ones, Smart banner will not be shown');
        expect(SmartBannerModule.SmartBanner).not.toBeCalled();
      });

      it.each(platforms)('continues initialisation on %s platform', (Platform: OsDetector.Platform) => {
        getPlatformSpy.mockReturnValueOnce(Platform);

        AdjustSmartBanner.init({ appToken: 'some-token' });

        expect(Logger.log).toBeCalledWith('Detected platform: ' + Platform);
        expect(SmartBannerModule.SmartBanner).toBeCalledWith('some-token', { appToken: 'some-token' }, Platform);
      });
    });

    describe('AppToken picking', () => {
      it('picks a string appToken and passes it to SmartBanner', () => {
        const definedPlatform = OsDetector.Platform.Android;
        getPlatformSpy.mockReturnValueOnce(definedPlatform);

        AdjustSmartBanner.init({ appToken: 'some-token' });

        expect(SmartBannerModule.SmartBanner).toBeCalledWith('some-token', { appToken: 'some-token' }, definedPlatform);
      });

      it.each(platforms)('picks an appToken according to detected Platform and passes it to SmartBanner', (Platform: OsDetector.Platform) => {
        getPlatformSpy.mockReturnValueOnce(Platform);

        AdjustSmartBanner.init({ appToken });

        expect(SmartBannerModule.SmartBanner).toBeCalledWith(appToken[Platform], { appToken }, Platform);
      });

      it.each(platforms)('logs a message and prevents initialisation if no appToken for current platform', (Platform: OsDetector.Platform) => {
        getPlatformSpy.mockReturnValueOnce(Platform);

        AdjustSmartBanner.init({ appToken: {} });

        expect(Logger.info).toBeCalledWith(`No app token found for platform: ${Platform}, Smart banner will not be shown`);
        expect(SmartBannerModule.SmartBanner).not.toBeCalled();
      });

      it('logs an error message and prevents initialisation when no appToken in parameters', () => {
        AdjustSmartBanner.init({} as InitialisationOptions);

        expect(Logger.error).toBeCalledWith('Can not initialise Smart Banner SDK, you should provide appToken');
        expect(SmartBannerModule.SmartBanner).not.toBeCalled();
      });
    });

    describe('Other initialisation options', () => {
      it('Passes options to SmartBanner', () => {
        const options = {
          appToken: 'some-token',
          iosDeepLinkPath: '{iosDeeplink}',
          androidDeepLinkPath: '{android-path}',
          context: { iosDeeplink: 'some-path', 'android-path': 'path/some' },
          language: 'fr',
          onCreated: jest.fn(),
          onDismissed: jest.fn(),
        };

        AdjustSmartBanner.init(options);

        expect(SmartBannerModule.SmartBanner).toBeCalledWith('some-token', options, OsDetector.Platform.Android);
      });
    });

    describe('Multiple initialisations', () => {
      it('prevents repeated initialisations and logs an error', () => {
        AdjustSmartBanner.init({ appToken: 'some-token' });

        expect(SmartBannerModule.SmartBanner).toBeCalledTimes(1);
        expect(Logger.error).not.toBeCalled();

        AdjustSmartBanner.init({ appToken: 'another-token' });

        expect(SmartBannerModule.SmartBanner).toBeCalledTimes(1);
        expect(Logger.error).toBeCalledWith('Smart Banner SDK is initialised already');
      });
    });
  });

  describe('Public methods', () => {
    describe('Visibility change', () => {
      describe('Show', () => {
        it('calls SmartBanner.show() method', () => {
          AdjustSmartBanner.init({ appToken: 'some-token' });

          AdjustSmartBanner.show();

          expect(SmartBanner.show).toBeCalled();
        });

        it('prevents if SDK was not initialised', () => {
          AdjustSmartBanner.show();

          expect(SmartBanner.show).not.toBeCalled();
          expect(Logger.error).toBeCalledWith('Can\'t show banner, you should initialise Smart Banner SDK first');
        });
      });

      describe('hide', () => {
        it('calls SmartBanner.hide() method', () => {
          AdjustSmartBanner.init({ appToken: 'some-token' });

          AdjustSmartBanner.hide();

          expect(SmartBanner.hide).toBeCalled();
        });

        it('prevents if SDK was not initialised', () => {
          AdjustSmartBanner.hide();

          expect(SmartBanner.hide).not.toBeCalled();
          expect(Logger.error).toBeCalledWith('Can\'t hide banner, you should initialise Smart Banner SDK first');
        });
      });
    });

    describe('Set language', () => {
      it('calls SmartBanner.setLanguage() method', () => {
        AdjustSmartBanner.init({ appToken: 'some-token' });

        AdjustSmartBanner.setLanguage('fr');

        expect(SmartBanner.setLanguage).toBeCalledWith('fr');
      });

      it('prevents if SDK was not initialised', () => {
        AdjustSmartBanner.setLanguage('fr');

        expect(SmartBanner.setLanguage).not.toBeCalled();
        expect(Logger.error).toBeCalledWith('Can\'t set language, you should initilise Smart Banner SDK first');
      });
    });

    describe('Set deeplink parameters', () => {
      it('calls SmartBanner.setIosDeepLinkPath() method', () => {
        AdjustSmartBanner.init({ appToken: 'some-token' });

        AdjustSmartBanner.setIosDeepLinkPath('some/{path}');

        expect(SmartBanner.setIosDeepLinkPath).toBeCalledWith('some/{path}');
      });

      it('calls SmartBanner.setAndroidDeepLinkPath() method', () => {
        AdjustSmartBanner.init({ appToken: 'some-token' });

        AdjustSmartBanner.setAndroidDeepLinkPath('someapp://{path}');

        expect(SmartBanner.setAndroidDeepLinkPath).toBeCalledWith('someapp://{path}');
      });

      it('calls SmartBanner.setContext() method', () => {
        AdjustSmartBanner.init({ appToken: 'some-token' });

        AdjustSmartBanner.setContext({ path: 'nowhere' });

        expect(SmartBanner.setContext).toBeCalledWith({ path: 'nowhere' });
      });

      it('prevents SmartBanner.setIosDeepLinkPath() if SDK was not initialised', () => {
        AdjustSmartBanner.setIosDeepLinkPath('someapp://{path}');

        expect(SmartBanner.setIosDeepLinkPath).not.toBeCalled();
        expect(Logger.error).toBeCalledWith('Can\'t set iOS deeplink path, you should initilise Smart Banner SDK first');
      });

      it('prevents SmartBanner.setContext() if SDK was not initialised', () => {
        AdjustSmartBanner.setContext({ path: 'nowhere' });

        expect(SmartBanner.setContext).not.toBeCalled();
        expect(Logger.error).toBeCalledWith('Can\'t set deeplink context, you should initilise Smart Banner SDK first');
      });
    });
  });
});
