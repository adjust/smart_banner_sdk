import { InitialisationOptions } from '@adjustcom/smart-banner-sdk';

export const defaultSdkSettings: InitialisationOptions = {
  appToken: '6uzo4j2d8hz4',
  logLevel: 'verbose',
  androidAppSchema: 'myapp',
  deepLinkPath: 'catalogue/product={product}',
  context: { promo: 'kitty', product: 't-shirt' }
};
