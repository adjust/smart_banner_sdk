import { SmartBannerData, SmartBannerResponseData } from "../types";
import { snakeToCamelCase } from "../../utils/snake-to-camel-case";

export function convertResponseToSmartBanners(data: SmartBannerResponseData[]): SmartBannerData[] | null {
  const banners: Array<SmartBannerData> = [];

  for (const item of data) {
    const banner: SmartBannerData = snakeToCamelCase<SmartBannerResponseData>(item);

    // TODO: is any validation needed?

    banners.push(banner);
  }

  if (banners.length < 1) {
    return null;
  }

  return banners;
}
