import { SmartBannerData } from '../data/api';

type KeyOfSmartBannerViewData = 'position' | 'size' | 'iconUrl' | 'title' | 'titleColor' | 'description' |
  'descriptionColor' | 'buttonLabel' | 'buttonColor' | 'backgroundUrl' | 'backgroundColor';

export type SmartBannerViewData = Pick<SmartBannerData, KeyOfSmartBannerViewData>
