import { InitialisationOptions } from '@adjustcom/smart-banner-sdk';

export const defaultSdkSettings: InitialisationOptions = {
  appToken: '6uzo4j2d8hz4',
  logLevel: 'verbose',
  iosDeepLinkPath: 'items/{product}',
  androidDeepLinkPath: '{path}',
  context: { promo: 'kitty', product: 't-shirt', path: 'android/{promo}-promo' }
};
