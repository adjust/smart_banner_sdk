import { AppToken, SmartBannerOptions, Callback } from './types';
import { Logger, LogLevel } from './utils/logger';
import { DeviceOS, getDeviceOS } from './utils/detect-os';
import { SmartBanner } from './domain/smart-banner';

// For api-extractor
export { AppToken, DeviceOS, LogLevel, SmartBannerOptions, Callback };

/** @public */
export type InitialisationOptions = SmartBannerOptions & { logLevel?: LogLevel };

function flattenAppToken(appToken: AppToken, deviceOs: DeviceOS): string | undefined {
  if (typeof appToken === 'string') {
    return appToken;
  }

  return appToken[deviceOs];
}

/**
 * A main SDK class to access public methods
 * @public
 */
export default class AdjustSmartBanner {
  private static smartBanner: SmartBanner | undefined;

  static init({ logLevel = 'error', ...restOptions }: InitialisationOptions) {
    Logger.setLogLevel(logLevel);

    if (!restOptions.appToken) {
      Logger.error('Can not initialise Smart Banner SDK, you should provide appToken');
      return;
    }

    const deviceOs = getDeviceOS();
    if (!deviceOs) {
      Logger.info('This platform is not one of the targeting ones, Smart banner will not be shown');
      return;
    }
    Logger.log('Detected platform: ' + deviceOs);

    const appToken = flattenAppToken(restOptions.appToken, deviceOs);
    if (!appToken) {
      Logger.info(`No app token found for platform: ${deviceOs}, Smart banner will not be shown`);
      return;
    }

    if (!this.smartBanner) {
      this.smartBanner = new SmartBanner(appToken, restOptions, deviceOs);
    } else {
      Logger.error('Smart Banner SDK is initialised already');
    }
  }

  static hide() {
    if (this.smartBanner) {
      this.smartBanner.hide();
    } else {
      Logger.error('Can\'t hide banner, you should initialise Smart Banner SDK first');
    }
  }

  static show() {
    if (this.smartBanner) {
      this.smartBanner.show();
    } else {
      Logger.error('Can\'t show banner, you should initialise Smart Banner SDK first');
    }
  }

  static setLanguage(lang: string) {
    if (!lang || typeof lang !== 'string') {
      Logger.error('Can\'t set language, provided parameter should be a non-empty string');
      return;
    }

    if (this.smartBanner) {
      this.smartBanner.setLanguage(lang);
    } else {
      Logger.error('Can\'t set language, you should initilise Smart Banner SDK first');
    }
  }

  static setIosDeepLinkPath(deeplinkPath: string): void {
    if (!deeplinkPath || typeof deeplinkPath !== 'string') {
      Logger.error('Can\'t set iOS deeplink path, provided parameter should be a non-empty string');
      return;
    }

    if (this.smartBanner) {
      this.smartBanner.setIosDeepLinkPath(deeplinkPath);
    } else {
      Logger.error('Can\'t set iOS deeplink path, you should initilise Smart Banner SDK first');
    }
  }

  static setAndroidAppSchema(appScheme: string): void {
    // TODO: remove this function in version 1.0.0
    Logger.warn('Method `setAndroidAppSchema` is deprecated and will be removed in SDK version 1.0.0, please update your code and use `setAndroidappScheme` instead');
    this.setAndroidAppScheme(appScheme);
  }

  static setAndroidAppScheme(appScheme: string): void {
    if (!appScheme || typeof appScheme !== 'string') {
      Logger.error('Can\'t set Android app scheme, provided parameter should be a non-empty string');
      return;
    }

    if (this.smartBanner) {
      this.smartBanner.setAndroidAppScheme(appScheme);
    } else {
      Logger.error('Can\'t set Android app scheme, you should initilise Smart Banner SDK first');
    }
  }

  static setAndroidDeepLinkPath(deeplinkPath: string): void {
    if (!deeplinkPath || typeof deeplinkPath !== 'string') {
      Logger.error('Can\'t set Android deeplink path, provided parameter should be a non-empty string');
      return;
    }

    if (this.smartBanner) {
      this.smartBanner.setAndroidDeepLinkPath(deeplinkPath);
    } else {
      Logger.error('Can\'t set Android deeplink path, you should initilise Smart Banner SDK first');
    }
  }

  static setContext(context?: Record<string, string>): void {
    // TODO: type check
    if (this.smartBanner) {
      this.smartBanner.setContext(context);
    } else {
      Logger.error('Can\'t set deeplink context, you should initilise Smart Banner SDK first');
    }
  }
}
