import { SmartBannerData } from '../../data/types';

export interface BannerFilter {
  filter(data: SmartBannerData[]): SmartBannerData[] | null;
}
