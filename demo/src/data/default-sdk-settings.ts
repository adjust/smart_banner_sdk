import { InitialisationOptions } from '@adjustcom/smart-banner-sdk';

export const defaultSdkSettings: InitialisationOptions = {
  appToken: 'l2yvpgmd17nk',
  logLevel: 'verbose',
  androidAppSchema: 'myapp',
  deepLinkPath: 'catalogue/product={product}',
  context: { promo: 'kitty', product: 't-shirt' }
};
