import { Position, BannerSize } from '@layout';
import { SnakeCaseKeysToCamelCase } from '../utils/snake-to-camel-case';

interface ContextData {
  domain?: string;
  tracker?: string;
  campaign?: string;
  adgroup?: string;
  deep_link?: string;
  deep_link_path?: string;
}

interface LocalizationData {
  title: string;
  description: string;
  button_label: string;
  icon_url: string;
  context: { adgroup: string; };
}

export interface SmartBannerResponseData {
  id: string;
  name: string;
  app_name: string;
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
    context: ContextData;
  };
  localizations: {
    [key: string]: LocalizationData;
  };
}

export type Localization = SnakeCaseKeysToCamelCase<LocalizationData>

export type Context = SnakeCaseKeysToCamelCase<ContextData>

export type SmartBannerData = SnakeCaseKeysToCamelCase<SmartBannerResponseData>

export type DeeplinkData = {
  deepLinkPath?: string;
  androidAppSchema?: string;
  context?: Record<string, string>;
}
