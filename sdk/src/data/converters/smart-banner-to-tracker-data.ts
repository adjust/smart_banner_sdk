import { SmartBannerData } from '../types';
import { TrackerData } from '../../domain/tracker-builder';

/**
 * Converts SmartBannerData to TrackerData
 * 
 * @returns A new object containing only tracker template and localized Context
 */
export function convertSmartBannerToTracker(data: SmartBannerData, domain?: string | null, locale?: string | null): TrackerData {
  const { trackerUrl: { template, context }, localizations } = data;

  const localization = locale && localizations ? localizations[locale] : null;
  const localeContext = localization ? localization.context : {};

  const trackerDomain = domain ? { domain } : {};

  return {
    template,
    context: { ...context, ...localeContext, ...trackerDomain }
  };
}
