import { SmartBannerData } from '../api';
import { SmartBannerViewData } from '../../view/types';

/**
 * Converts SmartBannerData to SmartBannerViewData
 * 
 * @returns A new object containing render options and localized labels and images
 */
export function convertDataToViewData(banner: SmartBannerData, locale?: string): SmartBannerViewData {
  const { id, isPreviousAttributionPriority, name, dismissalPeriod, trackerUrl, localizations, displayRule,
    ...renderData } = banner;

  if (locale && localizations[locale]) {
    const localization = localizations[locale];
    return { ...renderData, ...localization };
  }

  return renderData;
}
