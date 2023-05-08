import { SmartBannerData } from '../data/api';

type KeyOfSmartBannerViewData = 'position' | 'size' | 'iconUrl' | 'title' | 'titleColor' | 'description' |
  'descriptionColor' | 'buttonLabel' | 'buttonColor' | 'backgoundUrl' | 'backgoundColor';

export type SmartBannerViewData = Pick<SmartBannerData, KeyOfSmartBannerViewData>
