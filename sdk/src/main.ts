import { AppToken, SmartBannerOptions, Callback, DataResidencyRegion } from './types';
import { Logger, LogLevel } from './utils/logger';
import { DeviceOS, getDeviceOS } from './utils/detect-os';
import { SmartBanner } from './domain/smart-banner';

// For api-extractor
export { AppToken, DeviceOS, LogLevel, SmartBannerOptions, DataResidencyRegion, Callback };

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
export class AdjustSmartBanner {
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
    if (this.smartBanner) {
      this.smartBanner.setLanguage(lang);
    } else {
      Logger.error('Can\'t set locale, you should initilise Smart Banner SDK first');
    }
  }

  static setDeeplinkContext(congif: { deeplink?: string, context?: Record<string, string> }): void {
    if (this.smartBanner) {
      this.smartBanner.setDeeplinkContext(congif);
    } else {
      Logger.error('Can\'t set deeplink context, you should initilise Smart Banner SDK first');
    }
  }
}
