export enum Position {
  Top = 'top',
  Bottom = 'bottom'
}

export enum BannerSize {
  Small = 'small',
  Medium = 'medium',
  Fullscreen = 'fullscreen'
}

export interface SmartBannerViewData {
  position: Position;
  size: BannerSize;
  iconUrl: string;
  dismissButtonColor?: string;
  title: string;
  titleColor?: string;
  description?: string;
  descriptionColor?: string;
  buttonLabel: string;
  buttonTextColor?: string;
  buttonBackgroundColor?: string;
  backgroundColor?: string;
  backgroundImageUrl?: string;
}
