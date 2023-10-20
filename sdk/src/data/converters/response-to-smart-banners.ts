import { SmartBannerData, SmartBannerResponseData, Position, BannerSize } from '../types';
import { snakeToCamelCase } from '../../utils/snake-to-camel-case';

export function convertResponseToSmartBanners(data: SmartBannerResponseData[]): SmartBannerData[] | null {
  if (!Array.isArray(data)) {
    return null;
  }

  const banners: Array<SmartBannerData> = [];

  for (const bannerData of data) {
    const { button_label, ...rest } = bannerData;

    // TODO: Maybe it's needed to ignore this banner if all this fields are missing?
    const banner: SmartBannerData = {
      ...rest,
      position: bannerData.position || Position.Top,
      size: bannerData.size || BannerSize.Small,
      app_name: bannerData.app_name || '',
      title: bannerData.title || '',
      button_text: button_label || bannerData.button_text || '',
      dismissal_period: (bannerData.dismissal_period !== null && bannerData.dismissal_period !== undefined) ? bannerData.dismissal_period : 86400
    };

    banners.push(banner);
  }

  if (banners.length < 1) {
    return null;
  }

  return banners;
}
