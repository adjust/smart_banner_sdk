export enum Position {
  Top = 'top',
  Bottom = 'bottom'
}

export enum BannerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export interface SmartBannerViewData {
  position: Position;
  size: BannerSize;
  iconUrl: string;
  title: string;
  titleColor?: string;
  description: string;
  descriptionColor?: string;
  buttonLabel: string;
  buttonColor?: string;
  backgroundColor?: string;
  backgroundImageUrl?: string,
}
