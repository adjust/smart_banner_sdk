import { Logger } from './logger';
import { DeviceOS } from './utils/detect-os';
import { Network } from './network/network';
import { snakeToCamelCase, SnakeToCamelCaseObjectKeys } from './utils/snake-to-camel-case';

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
  [key: string]: string;
}

interface Localization {
  title: string;
  description: string;
  icon_url: string;
  button_label: string;
  context: Context;
}

interface SmartBannerResponseData {
  id: number;
  is_previous_attribution_priority: boolean;
  position: Position;
  name: string;
  title: string;
  title_color: string;
  description: string;
  description_color: string;
  icon_url: string;
  button_label: string;
  button_color: string;
  backgound_color: string;
  backgound_url: string;
  dismissal_period: number;
  tracker_url: {
    template: string;
    context: Context;
  };
  size: BannerSize;
  localizations: {
    [key: string]: Localization;
  };
  display_rule: string | null;
}

export type SmartBannerData = SnakeToCamelCaseObjectKeys<SmartBannerResponseData>

function transformData(data: SmartBannerResponseData[]): SmartBannerData[] | null {
  const banners: Array<SmartBannerData> = [];

  for (const item of data) {
    const banner: SmartBannerData = snakeToCamelCase<SmartBannerResponseData>(item);
    banners.push(banner);
  }

  if (banners.length < 1) {
    return null;
  }

  return banners;
}

export function fetchSmartBannerData(token: string, deviceOs: DeviceOS, network: Network): Promise<SmartBannerData[] | null> {
  const path = '/smart_banner';

  return network.request<SmartBannerResponseData[]>(path, { 'app_token': token, 'platform': deviceOs })
    .then(banners => {
      return transformData(banners);
    })
    .catch(error => {
      Logger.error('Network error occurred during loading Smart Banner: ' + JSON.stringify(error));
      return null;
    });
}
