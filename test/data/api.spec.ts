import { SmartBannerApi } from '@sdk/data/api';
import { Logger } from '@sdk/logger';
import { Network } from '@sdk/network/network';
import { DeviceOS } from '@sdk/utils/detect-os';
import { snakeToCamelCase } from '@sdk/utils/snake-to-camel-case';

import * as dataMock from '../../fake-data/smart_banners.json';

jest.mock('@sdk/logger');

describe('Smart banner API tests', () => {

  describe('fetchSmartBannerData', () => {
    const appToken = 'some-token';
    const platform = DeviceOS.iOS;

    const serverResponseMock = dataMock['ios'];

    const testNetwork: Network = {
      endpoint: 'test-endpoint',
      request: jest.fn()
    };

    const api = new SmartBannerApi(platform, testNetwork);

    let requestSpy: jest.SpyInstance;

    beforeAll(() => {
      jest.spyOn(Logger, 'error');

      requestSpy = jest.spyOn(testNetwork, 'request');
      requestSpy.mockResolvedValue(serverResponseMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns data when request is succesfull', async () => {
      expect.assertions(1 + serverResponseMock.length);

      let smartBannerData = await api.retrieve(appToken);

      expect(smartBannerData).not.toBeNull();

      smartBannerData = smartBannerData!;

      for (let i = 0; i < smartBannerData.length; i++) {
        const expected = snakeToCamelCase(serverResponseMock[i]);
        expect(smartBannerData[i]).toMatchObject(expected);
      }
    });

    it('returns null when no banners for platform', async () => {
      expect.assertions(1);
      requestSpy.mockResolvedValueOnce([]);

      const smartBannerData = await api.retrieve(appToken);

      expect(smartBannerData).toBeNull();
    });

    it('returns null when network error occurred', async () => {
      expect.assertions(2);

      const error = { status: 404, message: 'Not found' };
      requestSpy.mockRejectedValueOnce(error);

      const smartBannerData = await api.retrieve(appToken);

      expect(smartBannerData).toBeNull();
      expect(Logger.error).toHaveBeenCalledWith('Network error occurred during loading Smart Banner: ' + JSON.stringify(error));
    });
  });
});
