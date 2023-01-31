import { Logger } from './logger';
import { DeviceOS } from './utils/detect-os';
import { Network } from './network/network';

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

/**
 * Ensures response contains general info: title, description, button_label and tracker_token and converts response
 * to SmartBannerData
 */
function validate(response: Partial<SmartBannerResponse>): SmartBannerData | null {
  const { title, description, button_label, tracker_token } = response;

  if (title && description && button_label && tracker_token) {
    return {
      appId: response.app?.default_store_app_id || '',
      appName: response.app?.name || '',
      position: response.position || Position.Bottom,
      imageUrl: response.image_url,
      header: title,
      description: description,
      buttonText: button_label,
      trackerToken: tracker_token,
      deeplinkPath: response.deeplink_path,
      dismissInterval: 24 * 60 * 60 * 1000, // 1 day in millis before show banner next time
    };
  }

  return null;
}

export function fetchSmartBannerData(token: string, deviceOs: DeviceOS, network: Network): Promise<SmartBannerResponseData[] | null> {
  const path = '/smart_banner';

  return network.request<SmartBannerResponseData[]>(path, { 'app_token': token, 'platform': deviceOs })
    .then(banners => {
      return banners;
    })
    .catch(error => {
      Logger.error('Network error occurred during loading Smart Banner: ' + JSON.stringify(error));
      return null;
    });
}
