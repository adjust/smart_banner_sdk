import { SmartBannerResponseData, SmartBannerData } from './types'
import { AsyncDataSource } from './data-source';
import { DeviceOS } from '../utils/detect-os';
import { Logger } from '../utils/logger';
import { Network } from '../network/network';
import { snakeToCamelCase, SnakeToCamelCaseObjectKeys } from '../utils/snake-to-camel-case';


/**
 * Fetches smart banners for the certain platform from the backend using provided network.
 */
export class SmartBannerApi implements AsyncDataSource<string, SmartBannerData[]> {

  constructor(private platform: DeviceOS, private network: Network) { }

  private transformData(data: SmartBannerResponseData[]): SmartBannerData[] | null {
    const banners: Array<SmartBannerData> = [];

    // TODO: is any validation needed? Most probably it needs to check if title and button title aren't empty
    for (const item of data) {
      const banner: SmartBannerData = snakeToCamelCase<SmartBannerResponseData>(item);
      banners.push(banner);
    }

    if (banners.length < 1) {
      return null;
    }

    return banners;
  }

  public retrieve(token: string): Promise<SmartBannerData[] | null> {
    const path = '/smart_banner';

    return this.network.request<SmartBannerResponseData[]>(path, { 'app_token': token, 'platform': this.platform })
      .then(data => this.transformData(data))
      .catch(error => {
        Logger.error('Network error occurred during loading Smart Banner: ' + JSON.stringify(error));
        return null;
      });
  }
}
