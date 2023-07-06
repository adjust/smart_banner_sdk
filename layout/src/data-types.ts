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
  appName: string;
  dismissalButtonColor?: string;
  title: string;
  titleColor?: string;
  description?: string;
  descriptionColor?: string;
  buttonText: string;
  buttonTextColor?: string;
  buttonColor?: string;
  backgroundColor?: string;
  backgroundImageUrl?: string;
}
