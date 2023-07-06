import { SmartBannerLayout, SmartBannerView } from './smart-banner-view';
import { SmartBannerViewData } from './data-types';

// eslint-disable-next-line
const emptyHandler = () => { }

const emptyTrackerUrl = '';

export class SmartBannerLayoutFactory {
  static createPreview(data: SmartBannerViewData): SmartBannerLayout {
    return new SmartBannerView(data, emptyTrackerUrl, emptyHandler);
  }

  static createViewForSdk(data: SmartBannerViewData, trackerUrl: string, onDismiss: () => void): SmartBannerLayout {
    return new SmartBannerView(data, trackerUrl, onDismiss);
  }
}
