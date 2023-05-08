import { DeviceOS } from './utils/detect-os';
import { UserContext } from './data/types';

/** @public */
export type Callback = () => any;

/** @public */
export type AppToken = { [k in DeviceOS]?: string } | string;

/** @public */
export interface SmartBannerOptions {
  appToken: AppToken;
  deeplink?: string;
  context?: UserContext;
  language?: string;
  onCreated?: Callback;
  onDismissed?: Callback;
}
