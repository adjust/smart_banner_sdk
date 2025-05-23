import { Platform } from '@utils/detect-platform';
import { Logger } from '@utils/logger';
import { SmartBannerResponseData, SmartBannerData } from './types';
import { AsyncDataSource } from './data-source';
import { convertResponseToSmartBanners } from './converters/response-to-smart-banners';
import { Network } from '../network/network';

/**
 * Fetches smart banners for the certain platform from the backend using provided network.
 */
export class SmartBannerApi implements AsyncDataSource<string, SmartBannerData[]> {
  constructor(private platform: Platform, private network: Network) { }

  public retrieve(token: string): Promise<SmartBannerData[] | null> {
    Logger.log('Fetching Smart banners');
    const path = '/smart_banner';

    return this.network.request<SmartBannerResponseData[]>(path, { 'app_token': token, 'platform': this.platform })
      .then(data => {
        const banners = convertResponseToSmartBanners(data);
        if (banners) {
          Logger.log('Smart banners fetched');
        } else {
          Logger.log(`No Smart Banners for ${this.platform} platform found`);
        }
        return banners;
      })
      .catch(error => {
        Logger.error('Network error occurred during loading Smart Banner: ' + JSON.stringify(error));
        return null;
      });
  }
}
