import { SmartBannerData } from './data/api';

export function getBanner(banners: SmartBannerData[], url: string): SmartBannerData {
  const filteredBanners = banners
    .filter(it => {
      if (!it.displayRule) {
        return true;
      }

      const regex = new RegExp(it.displayRule, 'i');
      return regex.test(url);
    })
    .sort((a, b) => {
      if (!!a.displayRule && !b.displayRule) {
        return -1;
      }

      if (!a.displayRule && !!b.displayRule) {
        return 1;
      }

      return 0
    });

  return filteredBanners[0];
}
