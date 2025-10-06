import { SmartBannerApi } from '@sdk/data/api';
import { Logger } from '@sdk/utils/logger';
import { Network } from '@sdk/network/network';
import { Platform } from '@sdk/utils/detect-platform';

import serverResponseMock from '../../fake-data/smart_banners_mock.json';

jest.mock('@sdk/utils/logger');

describe('Smart banner API tests', () => {

  describe('fetchSmartBannerData', () => {
    const appToken = 'some-token';
    const platform = Platform.iOS;

    const testNetwork: Network = {
      request: jest.fn()
    };

    const api = new SmartBannerApi(platform, testNetwork);

    let requestSpy: jest.SpyInstance;

    beforeAll(() => {
      jest.spyOn(Logger, 'error');
      jest.spyOn(Logger, 'warn');

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
        const expected = serverResponseMock[i];
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

    it('attaches data_version parameter to request', async () => {
      expect.assertions(1);

      await api.retrieve(appToken);

      expect(requestSpy).toHaveBeenCalledWith('/smart_banner', {
        'app_token': appToken,
        'platform': platform,
        'data_version': 'v1'
      })
    })

    it('logs a message if data_version in response does not match', async () => {
      expect.assertions(1);

      await api.retrieve(appToken);

      expect(Logger.warn).toHaveBeenCalledWith('Data version does not match, consider to update the SDK');
    })
  });
});
