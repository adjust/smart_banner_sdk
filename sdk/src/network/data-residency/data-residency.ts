import { BaseUrlsMap, ENDPOINTS } from './endpoints';

export class DataResidency {
  private endpoints: Record<DataResidency.Region, BaseUrlsMap> = {
    [DataResidency.EU]: ENDPOINTS.EU,
    [DataResidency.TR]: ENDPOINTS.TR,
    [DataResidency.US]: ENDPOINTS.US,
  };

  constructor(private region: DataResidency.Region, endpoints?: Record<DataResidency.Region, BaseUrlsMap>) {
    this.endpoints = endpoints || this.endpoints
  }

  public get endpoint() {
    return this.endpoints[this.region].app;
  }
}

export namespace DataResidency {
  export const EU = 'EU';
  export const TR = 'TR';
  export const US = 'US';

  export type Region = typeof EU | typeof TR | typeof US
}
