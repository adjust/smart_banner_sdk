import { Logger, LogLevel } from './logger';
import { AppToken, SmartBanner, SmartBannerOptions } from './smart-banner';
import { DeviceOS, getDeviceOS } from './utils/detect-os';

type InitialisationOptions = SmartBannerOptions & { logLevel?: LogLevel };

function flattenAppToken(appToken: AppToken, deviceOs: DeviceOS): string | undefined {
  if (typeof appToken === 'string') {
    return appToken;
  }

  return appToken[deviceOs];
}

/**
 * A main SDK class to access public methods
 */
export class AdjustSmartBannerSDK {
  private static smartBanner: SmartBanner | null = null;

  static init({ logLevel = 'error', ...restOptions }: InitialisationOptions) {
    if (!restOptions.appToken) {
      Logger.error('Can not initialise Smart Banner, you should provide appToken');
      return;
    }

    const deviceOs = getDeviceOS();
    if (!deviceOs) {
      Logger.log('This platform is not one of the targeting ones, Smart banner will not be shown');
      return;
    }
    Logger.log('Detected platform: ' + deviceOs);

    const appToken = flattenAppToken(restOptions.appToken, deviceOs);
    if (!appToken) {
      Logger.info(`No app token found for platform: ${deviceOs}, Smart banner will not be shown`);
      return;
    }

    if (!this.smartBanner) {
      Logger.setLogLevel(logLevel);

      this.smartBanner = new SmartBanner(appToken, restOptions, deviceOs);
    } else {
      Logger.error('Smart Banner is initialised already');
    }
  }

  static hide() {
    if (this.smartBanner) {
      this.smartBanner.hide();
    } else {
      Logger.error('Can\'t hide banner, you should initialise Smart Banner first');
    }
  }

  static show() {
    if (this.smartBanner) {
      this.smartBanner.show();
    } else {
      Logger.error('Can\'t show banner, you should initialise Smart Banner first');
    }
  }

  static setLanguage(lang: string) {
    if (this.smartBanner) {
      this.smartBanner.setLanguage(lang);
    } else {
      Logger.error('Can\'t set locale, you should initilise Smart Banner first');
    }
  }
}
