import { Platform } from '@utils/detect-platform';
import { Logger } from '@utils/logger';
import { SmartBannerResponseData, SmartBannerData } from './types';
import { AsyncDataSource } from './data-source';
import { convertResponseToSmartBanners } from './converters/response-to-smart-banners';
import { Network } from '../network/network';
import { Globals } from '../globals';

/**
 * Fetches smart banners for the certain platform from the backend using provided network.
 */
export class SmartBannerApi implements AsyncDataSource<string, SmartBannerData[]> {
  constructor(private platform: Platform, private network: Network) { }

  public retrieve(token: string): Promise<SmartBannerData[] | null> {
    Logger.log('Fetching Smart banners');
    const path = '/smart_banner';

    return this.network.request<SmartBannerResponseData[]>(path, {
      'app_token': token,
      'platform': this.platform,
      'data_version': Globals.dataVersion
    })
      .then(data => {
        const convertedData = convertResponseToSmartBanners(data);
        if (convertedData) {
          Logger.log('Smart banners fetched');

          const dataVersion = convertedData.dataVersion;
          if (dataVersion && dataVersion.current !== dataVersion.latest) {
            Logger.warn('Data version does not match, consider to update the SDK');
          }

          return convertedData.banners;
        } else {
          Logger.log(`No Smart Banners for ${this.platform} platform found`);
          return null;
        }
      })
      .catch(error => {
        Logger.error('Network error occurred during loading Smart Banner: ' + JSON.stringify(error));
        return null;
      });
  }
}
