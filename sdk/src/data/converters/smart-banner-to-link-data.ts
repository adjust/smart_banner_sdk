import { SmartBannerData } from '../types';
import { TrackerData } from '../../domain/link-builder/tracker-builder';
import { ImpressionData } from '../../domain/link-builder/impression-link-builder';

/**
 * Converts SmartBannerData to TrackerData
 * 
 * @returns A new object containing only tracker templates and localized Context
 */
export function convertSmartBannerToTracker(data: SmartBannerData, locale?: string | null): TrackerData {
  return convertSmartBannerToLinkData('tracker', data, locale) as TrackerData;
}

/**
 * Converts SmartBannerData to ImpressionData
 * 
 * @returns A new object containing only impression templates and localized Context
 */
export function convertSmartBannerToImpression(data: SmartBannerData, locale?: string | null): ImpressionData {
  return convertSmartBannerToLinkData('impression', data, locale) as ImpressionData;
}

function convertSmartBannerToLinkData(type: 'tracker' | 'impression', data: SmartBannerData, locale?: string | null) {
  const { tracker_url: { template, default_template, impression_url, default_impression_url, context }, localizations } = data;

  const localization = locale && localizations ? localizations[locale] : null;
  const localeContext = localization ? localization.context : {};

  if (type === 'tracker') {
    return {
      template,
      default_template,
      context: { ...context, ...localeContext }
    };
  } else {
    return {
      impression_url,
      default_impression_url,
      context: { ...context, ...localeContext }
    };
  }
}
