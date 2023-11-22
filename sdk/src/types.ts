import { DeviceOS } from './utils/detect-os';

/** @public */
export type Callback = () => any; // eslint-disable-line  @typescript-eslint/no-explicit-any

/** @public */
export type AppToken = { [k in DeviceOS]?: string } | string;

/** @public */
export interface SmartBannerOptions {
  appToken: AppToken;
  language?: string;
  androidDeepLinkPath?: string;
  iosDeepLinkPath?: string;
  context?: Record<string, string>;
  bannerParent?: HTMLElement;
  onCreated?: Callback;
  onDismissed?: Callback;
}
