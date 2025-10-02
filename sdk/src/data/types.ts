import { Position, BannerSize } from '@layout';

interface CommonContextData {
  domain: string;
  tracker: string;
  campaign: string;
  localization_language: string;
}

interface IosContextData {
  deep_link_path: string;
  ios_deep_link_path: string;
}

interface AndroidContextData {
  deep_link: string;
  android_app_scheme: string;
  android_deep_link_path: string;
}

export type Context = CommonContextData & Partial<IosContextData> & Partial<AndroidContextData>;

export interface Localization {
  title: string;
  description: string;
  /** @deprecated */ button_label?: string;
  button_text?: string;
  icon_url?: string;
  context: { localization_language: string; };
}

export interface SmartBannerResponseData {
  id: string;
  name: string;
  app_name?: string;
  display_rule: string | null;
  display_rules: PlacementCondition | null;
  is_previous_attribution_priority: boolean;
  position: Position;
  size: BannerSize;
  dismissal_period: number;
  dismissal_button_color?: string;
  icon_url: string;
  title: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  /** @deprecated */ button_label?: string;
  button_text?: string;
  button_text_color?: string;
  button_color?: string;
  background_color?: string;
  background_image_url?: string,
  tracker_url: {
    template: string;
    impression_url: string;
    context: Context;
  };
  localizations: {
    [key: string]: Localization;
  };
  data_version: { current: string, latest: string };
}

export interface PlacementCondition {
  operator: 'or' | 'and';
  rules: Array<PlacementCondition | string>;
}

export interface SmartBannerData {
  id: string;
  name: string;
  app_name: string;
  display_rule: string | null;
  display_rules: PlacementCondition | null;
  is_previous_attribution_priority: boolean;
  position: Position;
  size: BannerSize;
  dismissal_period: number;
  dismissal_button_color?: string;
  icon_url: string;
  title: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  button_text: string;
  button_text_color?: string;
  button_color?: string;
  background_color?: string;
  background_image_url?: string,
  tracker_url: {
    template: string;
    impression_url: string;
    context: Context;
  };
  localizations: {
    [key: string]: Localization;
  };
}

export type DeeplinkData = {
  androidDeepLinkPath?: string;
  iosDeepLinkPath?: string;
  context?: Record<string, string>;
}

export { Position, BannerSize };
