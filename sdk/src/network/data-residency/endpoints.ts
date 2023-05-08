export type BaseUrlsMap = {
  endpointName: string;
  app: string;
  gdpr: string;
}

export const ENDPOINTS = {
  default: {
    endpointName: 'Default',
    app: 'https://app.adjust.com',
    gdpr: 'https://gdpr.adjust.com'
  } as BaseUrlsMap,
  EU: {
    endpointName: 'EU',
    app: 'https://app.eu.adjust.com',
    gdpr: 'https://gdpr.eu.adjust.com'
  } as BaseUrlsMap,
  TR: {
    endpointName: 'TR',
    app: 'https://app.tr.adjust.com',
    gdpr: 'https://gdpr.tr.adjust.com'
  } as BaseUrlsMap,
  US: {
    endpointName: 'US',
    app: 'https://app.us.adjust.com',
    gdpr: 'https://gdpr.us.adjust.com'
  } as BaseUrlsMap
};
