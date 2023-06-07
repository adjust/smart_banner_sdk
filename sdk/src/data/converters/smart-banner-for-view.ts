import { SmartBannerData } from '../types';
import { SmartBannerViewData } from '../../../../layout/view/types';

/**
 * Converts SmartBannerData to SmartBannerViewData
 * 
 * @returns A new object containing render options and localized labels and images
 */
export function convertSmartBannerDataForView(banner: SmartBannerData, locale?: string | null): SmartBannerViewData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isPreviousAttributionPriority, name, dismissalPeriod, trackerUrl, localizations, displayRule, defaultLanguage,
    ...renderData } = banner;

  if (locale && localizations[locale]) {
    const { context: _context, ...localization } = localizations[locale];
    return { ...renderData, ...localization };
  }

  return renderData;
}
