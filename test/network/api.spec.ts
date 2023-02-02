import { Logger } from '../../src/logger';
import { DeviceOS } from '../../src/utils/detect-os';
import { fetchSmartBannerData, SmartBannerData } from '../../src/api';
import { Network } from '../../src/network/network';
import { snakeToCamelCase } from '../../src/utils/snake-to-camel-case';

import * as dataMock from '../../src/mockData/smart_banners.json';

jest.mock('../../src/logger');

describe('Smart banner API tests', () => {
  describe('fetchSmartBannerData', () => {
    const webToken = 'p6o2pnb1zkzk';
    const platform = DeviceOS.iOS;

    const serverResponseMock = dataMock['app_token=p6o2pnb1zkzk&platform=ios'];

    const testNetwork: Network = {
      endpoint: 'test-endpoint',
      request: jest.fn()
    };

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

      let smartBannerData = await fetchSmartBannerData(webToken, platform, testNetwork);

      expect(smartBannerData).not.toBeNull();

      smartBannerData = smartBannerData!;

      for (let i = 0; i < smartBannerData.length; i++) {
        const expected = snakeToCamelCase(serverResponseMock[i]);
        expect(smartBannerData[i]).toMatchObject(expected);
      }
    });

    it('caches data', async () => {
      expect.assertions(2);

      const smartBannerData = await fetchSmartBannerData(webToken, platform, testNetwork);

      expect(smartBannerData).not.toBeNull();

      await fetchSmartBannerData(webToken, platform, testNetwork);

      expect(requestSpy).toBeCalledTimes(1);
    });

    it('returns null when no banners for platform', async () => {
      expect.assertions(1);
      requestSpy.mockResolvedValueOnce([]);

      const smartBannerData = await fetchSmartBannerData(webToken, platform, testNetwork);

      expect(smartBannerData).toBeNull();
    });

    it('returns null when network error occurred', async () => {
      expect.assertions(2);

      const error = { status: 404, message: 'Not found' };
      requestSpy.mockRejectedValueOnce(error);

      const smartBannerData = await fetchSmartBannerData(webToken, platform, testNetwork);

      expect(smartBannerData).toBeNull();
      expect(Logger.error).toHaveBeenCalledWith('Network error occurred during loading Smart Banner: ' + JSON.stringify(error));
    });
  });
});
