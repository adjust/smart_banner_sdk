import { AsyncDataSource } from './data-source';
import { DeviceOS } from '../utils/detect-os';
import { Logger } from '../utils/logger';
import { Network } from '../network/network';
import { snakeToCamelCase, SnakeToCamelCaseObjectKeys } from '../utils/snake-to-camel-case';

export enum Position {
  Top = 'top',
  Bottom = 'bottom'
}

export enum BannerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

interface Context {
  domain?: string;
  tracker?: string;
  campaign?: string;
  adgroup?: string;
  deeplink?: string | null;
}

interface Localization {
  title: string;
  description: string;
  button_label: string;
  icon_url: string;
  context: Context;
}

interface SmartBannerResponseData {
  id: string;
  name: string;
  display_rule: string | null;
  is_previous_attribution_priority: boolean;
  position: Position;
  size: BannerSize;
  dismissal_period: number;
  icon_url: string;
  title: string;
  title_color?: string;
  description: string;
  description_color?: string;
  button_label: string;
  button_color?: string;
  background_color?: string;
  background_image_url?: string,
  default_language: string,
  tracker_url: {
    template: string;
    context: Context;
  };
  localizations: {
    [key: string]: Localization;
  };
}

export type SmartBannerData = SnakeToCamelCaseObjectKeys<SmartBannerResponseData>

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
