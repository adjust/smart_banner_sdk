import { SmartBanner, SmartBannerOptions } from './smart-banner';
import { Logger, LogLevel } from './logger';

type InitialisationOptions = SmartBannerOptions & { logLevel?: LogLevel };

/**
 * A main SDK class to access public methods
 */
export class AdjustSmartBannerSDK {
  private static smartBanner: SmartBanner | null = null;

  static init({ logLevel = 'error', ...restOptions }: InitialisationOptions) {
    if (!restOptions.webToken) {
      Logger.error('Can not initialise Smart Banner, you should provide appToken');
      return;
    }

    if (!this.smartBanner) {
      Logger.setLogLevel(logLevel);

      this.smartBanner = new SmartBanner(restOptions);
    } else {
      Logger.error('Smart Banner is initialised already');
    }
  }

  static hide() {
    if (this.smartBanner) {
      this.smartBanner.hide();
    } else {
      Logger.error('You should initilise Smart Banner first');
    }
  }

  static show() {
    if (this.smartBanner) {
      this.smartBanner.show();
    } else {
      Logger.error('You should initilise Smart Banner first');
    }
  }
}
