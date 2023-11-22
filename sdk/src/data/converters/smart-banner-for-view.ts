import { SmartBannerViewData } from '@layout';
import { SnakeCaseKeysToCamelCase, snakeToCamelCase } from '@utils/snake-to-camel-case';
import { Localization, SmartBannerData } from '../types';

type LocalizedTexts = SnakeCaseKeysToCamelCase<Omit<Localization, 'context'>>

/**
 * Converts SmartBannerData to SmartBannerViewData
 * 
 * @returns A new object containing render options and localized labels and images
 */
export function convertSmartBannerDataForView(banner: SmartBannerData, locale?: string | null): SmartBannerViewData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, is_previous_attribution_priority, name, dismissal_period, tracker_url, localizations, display_rule,
    ...rest } = banner;

  const renderData: SmartBannerViewData = snakeToCamelCase(rest);

  let texts: LocalizedTexts = {} as LocalizedTexts;
  if (locale && banner.localizations[locale]) {
    const { context: _context, ...localization } = localizations[locale];
    texts = snakeToCamelCase(localization);
  }

  return { ...renderData, ...texts };
}
