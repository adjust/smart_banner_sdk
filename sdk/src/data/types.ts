import { SnakeCaseKeysToCamelCase } from '../utils/snake-to-camel-case';

export enum Position {
  Top = 'top',
  Bottom = 'bottom'
}

export enum BannerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export interface Context {
  domain?: string;
  tracker?: string;
  campaign?: string;
  adgroup?: string;
  deeplink?: string | null;
}

interface LocalizationData {
  title: string;
  description: string;
  button_label: string;
  icon_url: string;
  context: Context;
}

export interface SmartBannerResponseData {
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
    [key: string]: LocalizationData;
  };
}

export type Localization = SnakeCaseKeysToCamelCase<LocalizationData>

export type SmartBannerData = SnakeCaseKeysToCamelCase<SmartBannerResponseData>

export type UserContext = { deeplink?: string } & Record<string, string>
