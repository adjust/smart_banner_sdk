import { SmartBannerData, SmartBannerResponseData, Position, BannerSize } from '../types';
import { snakeToCamelCase } from '../../utils/snake-to-camel-case';

export function convertResponseToSmartBanners(data: SmartBannerResponseData[]): SmartBannerData[] | null {
  if (!Array.isArray(data)) {
    return null;
  }

  const banners: Array<SmartBannerData> = [];

  for (const item of data) {
    const data = snakeToCamelCase<SmartBannerResponseData>(item);
    const { buttonLabel, ...rest } = data;

    // TODO: Maybe it's needed to ignore this banner if all this fields are missing?
    const banner: SmartBannerData = {
      ...rest,
      position: data.position || Position.Top,
      size: data.size || BannerSize.Small,
      appName: data.appName || '',
      title: data.title || '',
      buttonText: buttonLabel || data.buttonText || '',
      dismissalPeriod: (data.dismissalPeriod !== null && data.dismissalPeriod !== undefined) ? data.dismissalPeriod : 86400
    };

    banners.push(banner);
  }

  if (banners.length < 1) {
    return null;
  }

  return banners;
}
