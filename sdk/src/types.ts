import { DeviceOS } from './utils/detect-os';

/** @public */
export type Callback = () => any;

/** @public */
export type AppToken = { [k in DeviceOS]?: string } | string;

/** @public */
export interface SmartBannerOptions {
  appToken: AppToken;
  language?: string;
  androidAppScheme?: string;
  androidDeepLinkPath?: string;
  iosDeepLinkPath?: string;
  context?: Record<string, string>;
  bannerParent?: HTMLElement;
  onCreated?: Callback;
  onDismissed?: Callback;
}
