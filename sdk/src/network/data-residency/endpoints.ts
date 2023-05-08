export type BaseUrlsMap = {
  endpointName: string;
  app: string;
  gdpr: string;
}

export const ENDPOINTS = {
  default: {
    endpointName: 'Default',
    app: 'app.adjust.com',
    gdpr: 'gdpr.adjust.com'
  } as BaseUrlsMap,
  EU: {
    endpointName: 'EU',
    app: 'app.eu.adjust.com',
    gdpr: 'gdpr.eu.adjust.com'
  } as BaseUrlsMap,
  TR: {
    endpointName: 'TR',
    app: 'app.tr.adjust.com',
    gdpr: 'gdpr.tr.adjust.com'
  } as BaseUrlsMap,
  US: {
    endpointName: 'US',
    app: 'app.us.adjust.com',
    gdpr: 'gdpr.us.adjust.com'
  } as BaseUrlsMap
};
