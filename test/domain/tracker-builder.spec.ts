import { Context } from '@sdk/data/types';
import { buildSmartBannerUrl } from '@sdk/domain/tracker-builder';

jest.mock('@sdk/utils/logger');

describe('Smart Banners tracker link building', () => {
  const commonTracker = 'https://{domain}/{tracker}?campaign={campaign}&adgroup={localization_language}';
  const iosTracker = 'https://{domain}/{deep_link_path}/adj_t={tracker}?adj_campaign={campaign}&adj_adgroup={localization_language}';
  const androidTracker = 'https://{domain}/{tracker}?deep_link={deep_link}&campaign={campaign}&adgroup={localization_language}';

  const commonContext: Context = {
    domain: 'test.domain',
    tracker: 'abc123',
    campaign: 'banner1',
    localization_language: 'en'
  };

  const androidContext: Context = {
    ...commonContext,
    deep_link: '{androidAppScheme}://{androidDeepLinkPath}',
    android_app_scheme: 'app',
    android_deep_link_path: 'some-path'
  };

  const iosContext: Context = {
    ...commonContext,
    deep_link_path: '{iosDeepLinkPath}',
    ios_deep_link_path: 'some-path'
  };

  const emptyUrl = '';
  const emptyCustomData = { context: {} };

  describe('No custom data', () => {
    it('builds common tracker', () => {
      const trackerData = {
        template: commonTracker,
        default_template: commonTracker,
        context: commonContext
      };

      const expected = 'https://test.domain/abc123?campaign=banner1&adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });

    it('builds ios tracker with plain deeplink', () => {
      const trackerData = {
        template: iosTracker,
        default_template: commonTracker,
        context: iosContext
      };

      const expected = 'https://test.domain/some-path/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });

    it('builds android tracker with plain deeplink', () => {
      const deepLink = 'app://some-path';

      const trackerData = {
        template: androidTracker,
        default_template: androidTracker,
        context: androidContext
      };

      const expected = `https://test.domain/abc123?deep_link=${encodeURIComponent(deepLink)}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });
  });

  describe('Custom deeplink path and context', () => {
    it('builds ios tracker with plain custom deeplink', () => {
      const customDeepLinkPath = 'my-product/t-shirt';

      const trackerData = {
        template: iosTracker,
        default_template: iosTracker,
        context: iosContext
      };

      const expected = 'https://test.domain/my-product/t-shirt/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, { iosDeepLinkPath: customDeepLinkPath })).toBe(expected);
    });

    it('builds ios tracker with provided deeplink template and custom context', () => {
      const trackerData = {
        template: iosTracker,
        default_template: iosTracker,
        context: { ...iosContext, ios_deep_link_path: 'my-product/{product}' }
      };

      const expected = 'https://test.domain/my-product/t-shirt/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, { context: { product: 't-shirt' } })).toBe(expected);
    });

    it('builds ios tracker with custom deeplink template and context', () => {
      const customDeepLinkPath = 'my-product/{product}';

      const trackerData = {
        template: iosTracker,
        default_template: iosTracker,
        context: iosContext
      };

      const expected = 'https://test.domain/my-product/jeans/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, emptyUrl, {
        iosDeepLinkPath: customDeepLinkPath,
        context: { product: 'jeans' }
      })).toBe(expected);
    });

    it('builds android tracker with a plain custom deeplink', () => {
      const customDeepLinkPath = 'my-product/t-shirt';

      const trackerData = {
        template: androidTracker,
        default_template: iosTracker,
        context: androidContext
      };

      const deeplink = encodeURIComponent(`app://${customDeepLinkPath}`);
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, { androidDeepLinkPath: customDeepLinkPath })).toBe(expected);
    });

    it('builds android tracker with provided deeplink template and custom context', () => {
      const trackerData = {
        template: androidTracker,
        default_template: androidTracker,
        context: { ...androidContext, android_deep_link_path: 'my-product/{product}' }
      };

      const deeplink = encodeURIComponent('app://my-product/t-shirt');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, { context: { product: 't-shirt' } })).toBe(expected);
    });

    it('builds android tracker with custom deeplink template and context', () => {
      const customDeepLinkPath = 'my-product/{product}';

      const trackerData = {
        template: androidTracker,
        default_template: androidTracker,
        context: androidContext
      };

      const deeplink = encodeURIComponent('app://my-product/shoes');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, emptyUrl, {
        androidDeepLinkPath: customDeepLinkPath,
        context: { product: 'shoes' }
      })).toBe(expected);
    });
  });

  describe('Uses GET parameters for interpolation', () => {
    it('builds ios tracker with deeplink template', () => {
      const trackerData = {
        template: iosTracker,
        default_template: iosTracker,
        context: { ...iosContext, ios_deep_link_path: 'some-path/{page}' }
      };

      const expected = 'https://test.domain/some-path/hello/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', emptyCustomData)).toBe(expected);
    });

    it('builds android tracker with deeplink template', () => {
      const trackerData = {
        template: androidTracker,
        default_template: androidTracker,
        context: { ...androidContext, android_deep_link_path: 'some-path/{page}' }
      };

      const deeplink = encodeURIComponent('app://some-path/hello');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', emptyCustomData)).toBe(expected);
    });

    it('builds ios tracker with custom deeplink template', () => {
      const trackerData = {
        template: iosTracker,
        default_template: iosTracker,
        context: iosContext
      };

      const expected = 'https://test.domain/some-path/hello/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      expect(buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', { iosDeepLinkPath: 'some-path/{page}' })).toBe(expected);
    });

    it('builds android tracker with custom deeplink template', () => {
      const trackerData = {
        template: androidTracker,
        default_template: androidTracker,
        context: androidContext
      };

      const deeplink = encodeURIComponent('app://some-path/hello');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', { androidDeepLinkPath: 'some-path/{page}' })).toBe(expected);
    });

    it('builds ios tracker using both custom context and GET parameters', () => {
      const trackerData = {
        template: iosTracker,
        default_template: iosTracker,
        context: { ...iosContext, ios_deep_link_path: '{path}/{page}' }
      };

      const expected = 'https://test.domain/long/path/hello/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      const tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', { context: { path: 'long/path' } });
      expect(tracker).toBe(expected);
    });

    it('builds android tracker using both custom context and GET parameters', () => {
      const trackerData = {
        template: androidTracker,
        default_template: androidTracker,
        context: { ...androidContext, android_deep_link_path: '{path}/{page}' }
      };

      const deeplink = encodeURIComponent('app://long/path/hello');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      const tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', { context: { path: 'long/path' } });
      expect(tracker).toBe(expected);
    });

    it('builds ios tracker preferring custom context than URL parameters', () => {
      const trackerData = {
        template: iosTracker,
        default_template: androidTracker,
        context: { ...iosContext, ios_deep_link_path: 'path/{page}' }
      };

      const expected = 'https://test.domain/path/meow/adj_t=abc123?adj_campaign=banner1&adj_adgroup=en';

      const tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', { context: { page: 'meow' } });
      expect(tracker).toBe(expected);
    });

    it('builds android tracker preferring custom context than URL parameters', () => {
      const trackerData = {
        template: androidTracker,
        default_template: androidTracker,
        context: { ...androidContext, android_deep_link_path: 'path/{page}' }
      };

      const deeplink = encodeURIComponent('app://path/meow');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      const tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?page=hello', { context: { page: 'meow' } });
      expect(tracker).toBe(expected);
    });
  });

  describe('Campaign parameters', () => {
    it('builds custom tracker', () => {
      const trackerData = {
        template: 'https://{domain}/{tracker}?campaign={utm_source}-{campaign}&adgroup={localization_language}&utm_content={utm_content}',
        default_template: commonTracker,
        context: commonContext
      };

      const expected = 'https://test.domain/abc123?campaign=hello_utm-banner1&adgroup=en&utm_content=image';

      const tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?utm_source=hello_utm&utm_content=image', emptyCustomData);
      expect(tracker).toBe(expected);
    });

    it('builds default tracker when campaign parameters unavailable', () => {
      const trackerData = {
        template: 'https://{domain}/{tracker}?campaign={utm_source}-{campaign}&adgroup={localization_language}&utm_content={utm_content}',
        default_template: commonTracker,
        context: commonContext
      };

      const expected = 'https://test.domain/abc123?campaign=banner1&adgroup=en';

      let tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?utm_source=hello', emptyCustomData);
      expect(tracker).toBe(expected);

      tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?utm_content=image', emptyCustomData);
      expect(tracker).toBe(expected);

      tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?params=none', emptyCustomData);
      expect(tracker).toBe(expected);
    });

    it('builds custom tracker ignoring unavailable placeholders in deeplink path', () => {
      const trackerData = {
        template: 'https://{domain}/{deep_link_path}/adj_t={tracker}?adj_campaign={campaign}_{utm_source}&adj_adgroup={localization_language}',
        default_template: 'no matter',
        context: { ...iosContext, ios_deep_link_path: 'some/path-to-{nothing}' }
      };

      const expected = 'https://test.domain/some/path-to-/adj_t=abc123?adj_campaign=banner1_hello&adj_adgroup=en'

      const tracker = buildSmartBannerUrl(trackerData, 'https://some-path/?utm_source=hello', emptyCustomData);
      expect(tracker).toBe(expected);
    })
  })
});
