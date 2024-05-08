import { SmartBannerLayout, SmartBannerView } from './smart-banner-view';
import { SmartBannerViewData } from './data-types';
import { FontLoader } from './font-loader';

// eslint-disable-next-line
const emptyHandler = () => { }

const emptyLink = '';

export class SmartBannerLayoutFactory {
  private static loadFonts(data: SmartBannerViewData) {
    if (data.titleFont) {
      FontLoader.addFontStylesheet(data.titleFont)
    }

    if (data.descriptionFont) {
      FontLoader.addFontStylesheet(data.descriptionFont)
    }

    if (data.buttonFont) {
      FontLoader.addFontStylesheet(data.buttonFont)
    }
  }

  static createPreview(data: SmartBannerViewData): SmartBannerLayout {
    this.loadFonts(data);
    return new SmartBannerView(data, emptyLink, emptyLink, emptyHandler);
  }

  static createViewForSdk(data: SmartBannerViewData, trackerUrl: string, impressionUrl: string, onDismiss: () => void): SmartBannerLayout {
    this.loadFonts(data);
    return new SmartBannerView(data, trackerUrl, impressionUrl, onDismiss);
  }
}
