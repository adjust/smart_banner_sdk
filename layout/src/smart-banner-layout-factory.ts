import { SmartBannerLayout, SmartBannerView } from './smart-banner-view';
import { SmartBannerViewData } from './data-types';

// eslint-disable-next-line
const emptyHandler = () => { }

const emptyLink = '';

export class SmartBannerLayoutFactory {
  static createPreview(data: SmartBannerViewData): SmartBannerLayout {
    return new SmartBannerView(data, emptyLink, emptyLink, emptyHandler);
  }

  static createViewForSdk(data: SmartBannerViewData, trackerUrl: string, impressionUrl: string, onDismiss: () => void): SmartBannerLayout {
    return new SmartBannerView(data, trackerUrl, impressionUrl, onDismiss);
  }
}
