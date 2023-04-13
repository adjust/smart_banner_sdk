import { SmartBannerResponseData, SmartBannerData } from './types';
import { AsyncDataSource } from './data-source';
import { convertResponseToSmartBanners } from './converters/response-to-smart-banners';
import { DeviceOS } from '../utils/detect-os';
import { Logger } from '../utils/logger';
import { Network } from '../network/network';

/**
 * Fetches smart banners for the certain platform from the backend using provided network.
 */
export class SmartBannerApi implements AsyncDataSource<string, SmartBannerData[]> {
  constructor(private platform: DeviceOS, private network: Network) { }

  public retrieve(token: string): Promise<SmartBannerData[] | null> {
    const path = '/smart_banner';

    return this.network.request<SmartBannerResponseData[]>(path, { 'app_token': token, 'platform': this.platform })
      .then(data => convertResponseToSmartBanners(data))
      .catch(error => {
        Logger.error('Network error occurred during loading Smart Banner: ' + JSON.stringify(error));
        return null;
      });
  }
}
