import { SmartBannerData } from '../data/types';

type KeyOfSmartBannerViewData = 'position' | 'size' | 'iconUrl' | 'title' | 'titleColor' | 'description' |
  'descriptionColor' | 'buttonLabel' | 'buttonColor' | 'backgroundImageUrl' | 'backgroundColor';

export type SmartBannerViewData = Pick<SmartBannerData, KeyOfSmartBannerViewData>
