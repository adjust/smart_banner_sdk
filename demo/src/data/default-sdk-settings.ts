import { InitialisationOptions } from '@adjustcom/smart-banner-sdk';

export const defaultSdkSettings: InitialisationOptions = {
  appToken: '9ok2a35jge0w',
  logLevel: 'verbose',
  androidAppSchema: 'myapp',
  deepLinkPath: 'catalogue/product={product}',
  context: { promo: 'kitty', product: 't-shirt' }
};
