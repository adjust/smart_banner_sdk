import { DataResidency } from '@sdk/network/data-residency/data-residency';
import { BaseUrlsMap } from '@sdk/network/data-residency/endpoints';

describe('DataResidency', () => {

  const testEndpoints: Record<DataResidency.Region, BaseUrlsMap> = {
    [DataResidency.EU]: {
      endpointName: 'EU',
      app: 'app.eu',
      gdpr: 'gdpr.eu'
    },
    [DataResidency.TR]: {
      endpointName: 'TR',
      app: 'app.tr',
      gdpr: 'gdpr.tr'
    },
    [DataResidency.US]: {
      endpointName: 'US',
      app: 'app.us',
      gdpr: 'gdpr.us'
    }
  };

  const regions: Array<DataResidency.Region> = [
    DataResidency.EU,
    DataResidency.TR,
    DataResidency.US
  ];

  it.each(regions)('returns urls map depending on region', (region: DataResidency.Region) => {
    const dataResidency = new DataResidency(region, testEndpoints);

    expect(dataResidency.endpoint).toEqual(testEndpoints[region].app);
  });
});
