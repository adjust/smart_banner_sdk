import { Network } from '@sdk/network/network';
import { NetworkWithDataResidency } from '@sdk/network/data-residency/data-residency-network';
import { DataResidency } from '@sdk/network/data-residency/data-residency';

jest.mock('@sdk/utils/logger');

describe('NetworkWithDataResidency', () => {

  const baseUrls = {
    endpointName: 'test',
    app: 'app.test',
    gdpr: 'gdpr.test'
  };

  const dataResidencyMock = new DataResidency('EU', { 'EU': baseUrls, 'US': baseUrls, 'TR': baseUrls, });
  let dataResidencySpy: jest.SpyInstance;

  const networkMock: Network = {
    trackerEndpoint: '', // not used in tests
    request: (_: string, __?: Record<string, string | number | boolean>) => Promise.resolve('all good') as any
  };

  describe('request', () => {
    beforeAll(() => {
      jest.spyOn(networkMock, 'request');

      dataResidencySpy = jest.spyOn(dataResidencyMock, 'endpoint', 'get');
      dataResidencySpy.mockImplementation(() => baseUrls.app);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('sends request with inner Network instance and uses UrlStrategy retries', async () => {
      expect.assertions(3);

      const network = new NetworkWithDataResidency(networkMock, dataResidencyMock);

      expect(dataResidencySpy).toHaveBeenCalled();

      const result = await network.request('/whatever', { foo: 'bar', n: 42 });

      expect(result).toEqual('all good');
      expect(networkMock.request).toHaveBeenCalledWith('/whatever', { foo: 'bar', n: 42 });
    });
  });

  describe('endpoint property', () => {
    beforeAll(() => {
      jest.spyOn(networkMock, 'request');
      jest.spyOn(dataResidencyMock, 'endpoint', 'get').mockImplementation(() => baseUrls.app);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns default endpoint before the first request', () => {
      const network = new NetworkWithDataResidency(networkMock, dataResidencyMock);

      expect(network.trackerEndpoint).toBe(baseUrls.app);
    });
  });
});
