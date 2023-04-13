import { BaseUrlsMap, ENDPOINTS } from './endpoints';

/** @public */
export type DataResidencyRegion = 'EU' | 'TR' | 'US'

export class DataResidency {
  private endpoints: Record<DataResidencyRegion, BaseUrlsMap> = {
    EU: ENDPOINTS.EU,
    TR: ENDPOINTS.TR,
    US: ENDPOINTS.US,
  };

  constructor(private region: DataResidencyRegion, endpoints?: Record<DataResidencyRegion, BaseUrlsMap>) {
    this.endpoints = endpoints || this.endpoints;
  }

  public get endpoint() {
    return this.endpoints[this.region].app;
  }
}
