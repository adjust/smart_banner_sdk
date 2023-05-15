import { buildSmartBannerUrl } from '@sdk/domain/tracker-builder';
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

  const emptyUrl = '';
  const emptyCustomData = {};

  describe('No custom data', () => {
    it('builds common tracker', () => {
      const trackerData = {
        template: commonTracker,
        context: commonContext
      };

      const expected = 'https://test.domain/abc123?campaign=banner1&adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });

    it('builds ios tracker with plain deeplink', () => {
      const trackerData = {
        template: iosTracker,
        context: { ...commonContext, deepLinkPath: 'some-path' }
      };

      const expected = 'https://test.domain/some-path/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });

    it('builds android tracker with plain deeplink', () => {
      const deepLink = 'schema://some-path';
      const trackerData = {
        template: androidTracker,
        context: { ...commonContext, deepLink }
      };

      const expected = `https://test.domain/abc123?deep_link=${encodeURIComponent(deepLink)}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });
  });

  describe('Uses URL parameters for interpolation', () => {
    it('builds ios tracker with deeplink template', () => {
      const trackerData = {
        template: iosTracker,
        context: { ...commonContext, deepLinkPath: 'some-path/{page}' }
      };

      const expected = 'https://test.domain/some-path/hello/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', emptyCustomData)).toBe(expected);
    });

    it('builds android tracker with deeplink template', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...commonContext, deepLink: 'schema://some-path/{page}' }
      };

      const deeplink = encodeURIComponent('schema://some-path/hello');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', emptyCustomData)).toBe(expected);
    });
  });

  describe('Custom deeplink context', () => {
    it('builds ios tracker with plain deeplink', () => {
      const customDeepLinkPath = 'my-product/t-shirt';

      const trackerData = {
        template: iosTracker,
        context: { ...commonContext, deepLinkPath: 'some-path/' }
      };

      const expected = 'https://test.domain/my-product/t-shirt/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, { deepLinkPath: customDeepLinkPath })).toBe(expected);
    });

    it('builds ios tracker with deeplink template', () => {
      const customDeepLinkPath = 'my-product/{product}';

      const trackerData = {
        template: iosTracker,
        context: { ...commonContext, deepLinkPath: 'some-path/{page}' }
      };

      const expected = 'https://test.domain/my-product/jeans/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, {
        deepLinkPath: customDeepLinkPath,
        context: { product: 'jeans' }
      })).toBe(expected);
    });

    it('builds android tracker with plain deeplink', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...commonContext, deepLink: 'schema://some-path' }
      };

      const deeplink = encodeURIComponent('app://products');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, {
        androidAppSchema: 'app',
        deepLinkPath: 'products'
      })).toBe(expected);
    });

    it('builds android tracker with deeplink template', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...commonContext, deepLink: 'schema://some-path' }
      };

      const deeplink = encodeURIComponent('app://products/shoes');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, {
        androidAppSchema: 'app',
        deepLinkPath: 'products/{product}',
        context: { product: 'shoes' }
      })).toBe(expected);
    });

    it('logs a warning if no app achema provided for android tracker', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...commonContext, deepLink: 'schema://some-path' }
      };

      const deeplink = encodeURIComponent('schema://some-path');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      const tracker = buildSmartBannerUrl(trackerData, emptyUrl, { deepLinkPath: 'new-path' });
      expect(Logger.warn).toBeCalledWith('Both androidAppSchema and deepLinkPath needed for android platform');
      expect(tracker).toBe(expected);
    });

    it('logs a warning if no deep link path provided for android tracker', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...commonContext, deepLink: 'schema://some-path' }
      };

      const deeplink = encodeURIComponent('schema://some-path');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      const tracker = buildSmartBannerUrl(trackerData, emptyUrl, { androidAppSchema: 'app' });
      expect(Logger.warn).toBeCalledWith('Both androidAppSchema and deepLinkPath needed for android platform');
      expect(tracker).toBe(expected);
    });

    it('logs a warning if tracker template does not contain deeplink placeholders and custom app schema provided', () => {
      const trackerData = {
        template: commonTracker,
        context: commonContext
      };

      const expected = 'https://test.domain/abc123?campaign=banner1&adgroup=en';

      const tracker = buildSmartBannerUrl(trackerData, emptyUrl, { androidAppSchema: 'schema' });
      expect(Logger.warn).toBeCalledWith('Tracker template does not contain deep link placeholders, can not set custom deep link path');
      expect(tracker).toBe(expected);
    });

    it('logs a warning if tracker template does not contain deeplink placeholders and custom deep link path provided', () => {
      const trackerData = {
        template: commonTracker,
        context: commonContext
      };

      const expected = 'https://test.domain/abc123?campaign=banner1&adgroup=en';

      const tracker = buildSmartBannerUrl(trackerData, emptyUrl, { deepLinkPath: 'some/path' });
      expect(Logger.warn).toBeCalledWith('Tracker template does not contain deep link placeholders, can not set custom deep link path');
      expect(tracker).toBe(expected);
    });

    it('prefers custom context than URL parameters', () => {
      const trackerData = {
        template: iosTracker,
        context: { ...commonContext, deepLinkPath: 'path/{page}' }
      };

      const expected = 'https://test.domain/path/meow/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      const tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', { context: { page: 'meow' } });
      expect(tracker).toBe(expected);
    });
  });
});
