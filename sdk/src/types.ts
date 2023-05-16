import { DeviceOS } from './utils/detect-os';

/** @public */
export type Callback = () => any;

/** @public */
export type AppToken = { [k in DeviceOS]?: string } | string;

/** @public */
export interface SmartBannerOptions {
  appToken: AppToken;
  language?: string;
  androidAppSchema?: string;
  deepLinkPath?: string;
  context?: Record<string, string>;
  onCreated?: Callback;
  onDismissed?: Callback;
}
