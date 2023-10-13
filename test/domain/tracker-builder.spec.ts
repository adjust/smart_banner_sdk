import { Context } from '@sdk/data/types';
import { buildSmartBannerUrl } from '@sdk/domain/tracker-builder';
import { DeviceOS } from '@sdk/main';
import { Logger } from '@sdk/utils/logger';

jest.mock('@sdk/utils/logger');

describe('Smart Banners tracker link building', () => {
  const commonTracker = 'https://{domain}/{tracker}?campaign={campaign}&adgroup={adgroup}';
  const iosTracker = 'https://{domain}/{deep_link_path}/adj_t={tracker}?adj_campaign={campaign}&adj_adgroup={adgroup}';
  const androidTracker = 'https://{domain}/{tracker}?deep_link={deep_link}&campaign={campaign}&adgroup={adgroup}';

  const commonContext = {
    domain: 'test.domain',
    tracker: 'abc123',
    campaign: 'banner1',
    adgroup: 'en'
  };

  const androidContext = {
    ...commonContext,
    deepLink: "{androidAppScheme}://{androidDeepLinkPath}",
    androidAppScheme: 'app',
    androidDeepLinkPath: 'some-path'
  }

  const iosContext = {
    ...commonContext,
    deepLinkPath: "{iosDeepLinkPath}",
    iosDeepLinkPath: 'some-path'
  }

  const emptyUrl = '';
  const emptyCustomData = {};

  describe('No custom data', () => {
    it('builds common tracker', () => {
      const trackerData = {
        template: commonTracker,
        context: commonContext as Context
      };

      const expected = 'https://test.domain/abc123?campaign=banner1&adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });

    it('builds ios tracker with plain deeplink', () => {
      const trackerData = {
        template: iosTracker,
        context: iosContext as Context
      };

      const expected = 'https://test.domain/some-path/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });

    it('builds android tracker with plain deeplink', () => {
      const deepLink = 'app://some-path';
      const trackerData = {
        template: androidTracker,
        context: androidContext as Context
      };

      const expected = `https://test.domain/abc123?deep_link=${encodeURIComponent(deepLink)}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });
  });

  describe('Uses URL parameters for interpolation', () => {
    it('builds ios tracker with deeplink template', () => {
      const trackerData = {
        template: iosTracker,
        context: { ...iosContext, iosDeepLinkPath: 'some-path/{page}' } as Context
      };

      const expected = 'https://test.domain/some-path/hello/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', emptyCustomData)).toBe(expected);
    });

    it('builds android tracker with deeplink template', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...androidContext, androidDeepLinkPath: 'some-path/{page}' } as Context
      };

      const deeplink = encodeURIComponent('app://some-path/hello');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', emptyCustomData)).toBe(expected);
    });
  });

  describe('Custom deeplink context', () => {
    it('builds ios tracker with plain deeplink', () => {
      const customDeepLinkPath = 'my-product/t-shirt';

      const trackerData = {
        template: iosTracker,
        context: { ...iosContext, iosDeepLinkPath: customDeepLinkPath } as Context
      };

      const expected = 'https://test.domain/my-product/t-shirt/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, { iosDeepLinkPath: customDeepLinkPath })).toBe(expected);
    });

    it('builds ios tracker with deeplink template', () => {
      const customDeepLinkPath = 'my-product/{product}';

      const trackerData = {
        template: iosTracker,
        context: { ...iosContext, iosDeepLinkPath: customDeepLinkPath } as Context
      };

      const expected = 'https://test.domain/my-product/jeans/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, {
        iosDeepLinkPath: customDeepLinkPath,
        context: { product: 'jeans' }
      })).toBe(expected);
    });

    it('builds android tracker with a plain deeplink', () => {
      const trackerData = {
        template: androidTracker,
        context: androidContext as Context
      };

      const deeplink = encodeURIComponent('app://some-path');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, { androidDeepLinkPath: 'products' })).toBe(expected);
    });

    it('builds android tracker with deeplink template', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...androidContext, androidDeepLinkPath: 'products/{product}' } as Context
      };

      const deeplink = encodeURIComponent('app://products/shoes');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, {
        androidDeepLinkPath: 'products/{product}',
        context: { product: 'shoes' }
      })).toBe(expected);
    });

    it('prefers custom context than URL parameters', () => {
      const trackerData = {
        template: iosTracker,
        context: { ...commonContext, deepLinkPath: 'path/{page}' } as Context
      };

      const expected = 'https://test.domain/path/meow/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      const tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', { context: { page: 'meow' } });
      expect(tracker).toBe(expected);
    });
  });
});
