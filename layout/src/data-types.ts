export enum Position {
  Top = 'top',
  Bottom = 'bottom'
}

export enum BannerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export interface Font {
  family: string;
  source: string;
}

export interface SmartBannerViewData {
  position: Position;
  size: BannerSize;
  iconUrl: string;
  appName: string;
  dismissalButtonColor?: string;
  title: string;
  titleColor?: string;
  titleFont?: Font;
  titleFontSize?: number;
  description?: string;
  descriptionColor?: string;
  descriptionFont?: Font;
  descriptionFontSize?: number;
  buttonText: string;
  buttonTextColor?: string;
  buttonFont?: Font;
  buttonFontSize?: number;
  buttonColor?: string;
  backgroundColor?: string;
  backgroundImageUrl?: string;
}
