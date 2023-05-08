import { Logger as _Logger, LogLevel } from '@sdk/utils/logger';
import { AppToken, DataResidencyRegion, InitialisationOptions } from '@sdk/main';
import * as _SmartBannerModule from '@sdk/domain/smart-banner';
import * as OsDetector from '@sdk/utils/detect-os';
import { AdjustSmartBanner as _AdjustSmartBanner } from '@sdk/main';

jest.doMock('@sdk/domain/smart-banner');
jest.mock('@sdk/utils/logger');

describe('Entry point tests', () => {
  let AdjustSmartBanner: typeof _AdjustSmartBanner;
  let Logger: typeof _Logger;
  let DetectOs: typeof OsDetector;
  let SmartBannerModule: typeof _SmartBannerModule;
  const SmartBanner = {
    show: jest.fn(),
    hide: jest.fn(),
    setLanguage: jest.fn(),
    setDeeplinkContext: jest.fn()
  };

  let getDeviceOSSpy: jest.SpyInstance<OsDetector.DeviceOS | undefined>;

  const platforms = [OsDetector.DeviceOS.iOS, OsDetector.DeviceOS.Android, OsDetector.DeviceOS.WindowsPC, OsDetector.DeviceOS.WindowsPhone];

  const appToken: AppToken = {
    'android': 'android-token',
    'ios': 'ios-token',
    'windows': 'win-token',
    'windows-phone': 'wp-token'
  };

  beforeEach(() => {
    AdjustSmartBanner = require('@sdk/main').AdjustSmartBanner;
    DetectOs = require('@sdk/utils/detect-os');
    SmartBannerModule = require('@sdk/domain/smart-banner');
    Logger = require('@sdk/utils/logger').Logger;

    getDeviceOSSpy = jest.spyOn(DetectOs, 'getDeviceOS');
    getDeviceOSSpy.mockReturnValue(OsDetector.DeviceOS.Android);

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
        getDeviceOSSpy.mockReturnValueOnce(undefined);

        AdjustSmartBanner.init({ appToken: 'some-token' });

        expect(Logger.info).toBeCalledWith('This platform is not one of the targeting ones, Smart banner will not be shown');
        expect(SmartBannerModule.SmartBanner).not.toBeCalled();
      });

      it.each(platforms)('continues initialisation on %s platform', (deviceOs: OsDetector.DeviceOS) => {
        getDeviceOSSpy.mockReturnValueOnce(deviceOs);

        AdjustSmartBanner.init({ appToken: 'some-token' });

        expect(Logger.log).toBeCalledWith('Detected platform: ' + deviceOs);
        expect(SmartBannerModule.SmartBanner).toBeCalledWith('some-token', { appToken: 'some-token' }, deviceOs);
      });
    });

    describe('AppToken picking', () => {
      it('picks a string appToken and passes it to SmartBanner', () => {
        const definedPlatform = OsDetector.DeviceOS.Android;
        getDeviceOSSpy.mockReturnValueOnce(definedPlatform);

        AdjustSmartBanner.init({ appToken: 'some-token' });

        expect(SmartBannerModule.SmartBanner).toBeCalledWith('some-token', { appToken: 'some-token' }, definedPlatform);
      });

      it.each(platforms)('picks an appToken according to detected DeviceOs and passes it to SmartBanner', (deviceOs: OsDetector.DeviceOS) => {
        getDeviceOSSpy.mockReturnValueOnce(deviceOs);

        AdjustSmartBanner.init({ appToken });

        expect(SmartBannerModule.SmartBanner).toBeCalledWith(appToken[deviceOs], { appToken }, deviceOs);
      });

      it.each(platforms)('logs a message and prevents initialisation if no appToken for current platform', (deviceOs: OsDetector.DeviceOS) => {
        getDeviceOSSpy.mockReturnValueOnce(deviceOs);

        AdjustSmartBanner.init({ appToken: {} });

        expect(Logger.info).toBeCalledWith(`No app token found for platform: ${deviceOs}, Smart banner will not be shown`);
        expect(SmartBannerModule.SmartBanner).not.toBeCalled();
      });

      it('logs an error message and prevents initialisation when no appToken in parameters', () => {
        AdjustSmartBanner.init({} as InitialisationOptions);

        expect(Logger.error).toBeCalledWith('Can not initialise Smart Banner, you should provide appToken');
        expect(SmartBannerModule.SmartBanner).not.toBeCalled();
      });
    });

    describe('Other initialisation options', () => {
      it('Passes options to SmartBanner', () => {
        const options = {
          appToken: 'some-token',
          dataResidency: 'TR' as DataResidencyRegion,
          deeplink: 'deeplink',
          context: { deeplink: 'some:://path' },
          language: 'fr',
          onCreated: jest.fn(),
          onDismissed: jest.fn(),
        };

        AdjustSmartBanner.init(options);

        expect(SmartBannerModule.SmartBanner).toBeCalledWith('some-token', options, OsDetector.DeviceOS.Android);
      });
    });

    describe('Multiple initialisations', () => {
      it('prevents repeated initialisations and logs an error', () => {
        AdjustSmartBanner.init({ appToken: 'some-token' });

        expect(SmartBannerModule.SmartBanner).toBeCalledTimes(1);
        expect(Logger.error).not.toBeCalled();

        AdjustSmartBanner.init({ appToken: 'another-token' });

        expect(SmartBannerModule.SmartBanner).toBeCalledTimes(1);
        expect(Logger.error).toBeCalledWith('Smart Banner is initialised already');
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
          expect(Logger.error).toBeCalledWith('Can\'t show banner, you should initialise Smart Banner first');
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
          expect(Logger.error).toBeCalledWith('Can\'t hide banner, you should initialise Smart Banner first');
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
        expect(Logger.error).toBeCalledWith('Can\'t set locale, you should initilise Smart Banner first');
      });
    });

    describe('Set deeplink and context', () => {
      const deeplinkContext = {
        deeplink: 'someapp://{path}',
        context: { path: 'nowhere' }
      };

      it('calls SmartBanner.setDeeplinkContext() method', () => {
        AdjustSmartBanner.init({ appToken: 'some-token' });

        AdjustSmartBanner.setDeeplinkContext(deeplinkContext);

        expect(SmartBanner.setDeeplinkContext).toBeCalledWith(deeplinkContext);
      });

      it('prevents if SDK was not initialised', () => {
        AdjustSmartBanner.setDeeplinkContext({
          deeplink: 'someapp://{path}',
          context: { path: 'nowhere' }
        });

        expect(SmartBanner.setDeeplinkContext).not.toBeCalled();
        expect(Logger.error).toBeCalledWith('Can\'t set deeplink context, you should initilise Smart Banner first');
      });
    });
  });
});
