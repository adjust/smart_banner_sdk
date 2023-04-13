import { DataResidency, DataResidencyRegion } from '@sdk/network/data-residency/data-residency';
import { BaseUrlsMap } from '@sdk/network/data-residency/endpoints';

describe('DataResidency', () => {

  const testEndpoints: Record<DataResidencyRegion, BaseUrlsMap> = {
    EU: {
      endpointName: 'EU',
      app: 'app.eu',
      gdpr: 'gdpr.eu'
    },
    TR: {
      endpointName: 'TR',
      app: 'app.tr',
      gdpr: 'gdpr.tr'
    },
    US: {
      endpointName: 'US',
      app: 'app.us',
      gdpr: 'gdpr.us'
    }
  };

  const regions: Array<DataResidencyRegion> = ['EU', 'TR', 'US'];

  it.each(regions)('returns urls map depending on region', (region: DataResidencyRegion) => {
    const dataResidency = new DataResidency(region, testEndpoints);

    expect(dataResidency.endpoint).toEqual(testEndpoints[region].app);
  });
});
