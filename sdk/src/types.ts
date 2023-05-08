import { DataResidencyRegion } from './network/data-residency/data-residency';
import { DeviceOS } from './utils/detect-os';
import { UserContext } from './data/types';

/** @public */
export type Callback = () => any;

/** @public */
export type AppToken = { [k in DeviceOS]?: string } | string;

/** @public */
export interface SmartBannerOptions {
  appToken: AppToken;
  dataResidency?: DataResidencyRegion;
  deeplink?: string;
  context?: UserContext;
  language?: string;
  onCreated?: Callback;
  onDismissed?: Callback;
}

export { DataResidencyRegion };
