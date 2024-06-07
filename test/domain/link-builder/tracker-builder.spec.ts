import { Context } from '@sdk/data/types';
import { TrackerBuilder } from '@sdk/domain/link-builder/tracker-builder';
import * as DetectOs from '@sdk/utils/detect-os';

jest.mock('@sdk/utils/logger');

describe('Smart Banners tracker link building', () => {
  const commonTracker = 'https://{domain}/{tracker}?campaign={campaign}&adgroup={localization_language}';
  const iosTracker = 'https://{domain}/{deep_link_path}?adj_t={tracker}&adj_campaign={campaign}&adj_adgroup={localization_language}';
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
        context: commonContext
      };

      const expected = 'https://test.domain/abc123?campaign=banner1&adgroup=en';

      expect(TrackerBuilder.build(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });

    it('builds ios tracker with plain deeplink', () => {
      const trackerData = {
        template: iosTracker,
        context: iosContext
      };

      const expected = 'https://test.domain/some-path?adj_t=abc123&adj_campaign=banner1&adj_adgroup=en';

      expect(TrackerBuilder.build(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });

    it('builds android tracker with plain deeplink', () => {
      const deepLink = 'app://some-path';

      const trackerData = {
        template: androidTracker,
        context: androidContext
      };

      const expected = `https://test.domain/abc123?deep_link=${encodeURIComponent(deepLink)}&campaign=banner1&adgroup=en`;

      expect(TrackerBuilder.build(trackerData, emptyUrl, emptyCustomData)).toBe(expected);
    });
  });

  describe('Custom deeplink path and context', () => {
    it('builds ios tracker with plain custom deeplink', () => {
      const customDeepLinkPath = 'my-product/t-shirt';

      const trackerData = {
        template: iosTracker,
        context: iosContext
      };

      const expected = 'https://test.domain/my-product/t-shirt?adj_t=abc123&adj_campaign=banner1&adj_adgroup=en';

      expect(TrackerBuilder.build(trackerData, emptyUrl, { iosDeepLinkPath: customDeepLinkPath })).toBe(expected);
    });

    it('builds ios tracker with provided deeplink template and custom context', () => {
      const trackerData = {
        template: iosTracker,
        context: { ...iosContext, ios_deep_link_path: 'my-product/{product}' }
      };

      const expected = 'https://test.domain/my-product/t-shirt?adj_t=abc123&adj_campaign=banner1&adj_adgroup=en';

      expect(TrackerBuilder.build(trackerData, emptyUrl, { context: { product: 't-shirt' } })).toBe(expected);
    });

    it('builds ios tracker with custom deeplink template and context', () => {
      const customDeepLinkPath = 'my-product/{product}';

      const trackerData = {
        template: iosTracker,
        context: iosContext
      };

      const expected = 'https://test.domain/my-product/jeans?adj_t=abc123&adj_campaign=banner1&adj_adgroup=en';

      expect(TrackerBuilder.build(trackerData, emptyUrl, {
        iosDeepLinkPath: customDeepLinkPath,
        context: { product: 'jeans' }
      })).toBe(expected);
    });

    it('builds a valid URL when a search query passed as iosDeepLinkPath', () => {
      jest.spyOn(DetectOs, 'getDeviceOS').mockReturnValue(DetectOs.DeviceOS.iOS);

      const customDeepLinkPath = 'search?product={product}';

      const trackerData = {
        template: iosTracker,
        context: iosContext
      };

      const expected = 'https://test.domain/search?product=jeans&adj_t=abc123&adj_campaign=banner1&adj_adgroup=en';

      expect(TrackerBuilder.build(trackerData, emptyUrl, {
        iosDeepLinkPath: customDeepLinkPath,
        context: { product: 'jeans' }
      })).toBe(expected);

      jest.spyOn(DetectOs, 'getDeviceOS').mockRestore();
    });

    it('builds android tracker with a plain custom deeplink', () => {
      const customDeepLinkPath = 'my-product/t-shirt';

      const trackerData = {
        template: androidTracker,
        context: androidContext
      };

      const deeplink = encodeURIComponent(`app://${customDeepLinkPath}`);
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(TrackerBuilder.build(trackerData, emptyUrl, { androidDeepLinkPath: customDeepLinkPath })).toBe(expected);
    });

    it('builds android tracker with provided deeplink template and custom context', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...androidContext, android_deep_link_path: 'my-product/{product}' }
      };

      const deeplink = encodeURIComponent('app://my-product/t-shirt');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(TrackerBuilder.build(trackerData, emptyUrl, { context: { product: 't-shirt' } })).toBe(expected);
    });

    it('builds android tracker with custom deeplink template and context', () => {
      const customDeepLinkPath = 'my-product/{product}';

      const trackerData = {
        template: androidTracker,
        context: androidContext
      };

      const deeplink = encodeURIComponent('app://my-product/shoes');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(TrackerBuilder.build(trackerData, emptyUrl, {
        androidDeepLinkPath: customDeepLinkPath,
        context: { product: 'shoes' }
      })).toBe(expected);
    });

    it('builds a valid URL when a search query passed as androidDeepLinkPath', () => {
      const customDeepLinkPath = 'search?product={product}';

      const trackerData = {
        template: androidTracker,
        context: androidContext
      };

      const expected = 'https://test.domain/abc123?deep_link=app%3A%2F%2Fsearch%3Fproduct%3Djeans&campaign=banner1&adgroup=en';

      expect(TrackerBuilder.build(trackerData, emptyUrl, {
        androidDeepLinkPath: customDeepLinkPath,
        context: { product: 'jeans' }
      })).toBe(expected);
    });
  });

  describe('Uses GET parameters for interpolation', () => {
    it('builds ios tracker with deeplink template', () => {
      const trackerData = {
        template: iosTracker,
        context: { ...iosContext, ios_deep_link_path: 'some-path/{page}' }
      };

      const expected = 'https://test.domain/some-path/hello?adj_t=abc123&adj_campaign=banner1&adj_adgroup=en';

      expect(TrackerBuilder.build(trackerData, 'https://some-path/?page=hello', emptyCustomData)).toBe(expected);
    });

    it('builds android tracker with deeplink template', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...androidContext, android_deep_link_path: 'some-path/{page}' }
      };

      const deeplink = encodeURIComponent('app://some-path/hello');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(TrackerBuilder.build(trackerData, 'https://some-path/?page=hello', emptyCustomData)).toBe(expected);
    });

    it('builds ios tracker with custom deeplink template', () => {
      const trackerData = {
        template: iosTracker,
        context: iosContext
      };

      const expected = 'https://test.domain/some-path/hello?adj_t=abc123&adj_campaign=banner1&adj_adgroup=en';

      expect(TrackerBuilder.build(trackerData, 'https://some-path/?page=hello', { iosDeepLinkPath: 'some-path/{page}' })).toBe(expected);
    });

    it('builds android tracker with custom deeplink template', () => {
      const trackerData = {
        template: androidTracker,
        context: androidContext
      };

      const deeplink = encodeURIComponent('app://some-path/hello');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      expect(TrackerBuilder.build(trackerData, 'https://some-path/?page=hello', { androidDeepLinkPath: 'some-path/{page}' })).toBe(expected);
    });

    it('builds ios tracker using both custom context and GET parameters', () => {
      const trackerData = {
        template: iosTracker,
        context: { ...iosContext, ios_deep_link_path: '{path}/{page}' }
      };

      const expected = 'https://test.domain/long/path/hello?adj_t=abc123&adj_campaign=banner1&adj_adgroup=en';

      const tracker = TrackerBuilder.build(trackerData, 'https://some-path/?page=hello', { context: { path: 'long/path' } });
      expect(tracker).toBe(expected);
    });

    it('builds android tracker using both custom context and GET parameters', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...androidContext, android_deep_link_path: '{path}/{page}' }
      };

      const deeplink = encodeURIComponent('app://long/path/hello');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      const tracker = TrackerBuilder.build(trackerData, 'https://some-path/?page=hello', { context: { path: 'long/path' } });
      expect(tracker).toBe(expected);
    });

    it('builds ios tracker preferring custom context than URL parameters', () => {
      const trackerData = {
        template: iosTracker,
        context: { ...iosContext, ios_deep_link_path: 'path/{page}' }
      };

      const expected = 'https://test.domain/path/meow?adj_t=abc123&adj_campaign=banner1&adj_adgroup=en';

      const tracker = TrackerBuilder.build(trackerData, 'https://some-path/?page=hello', { context: { page: 'meow' } });
      expect(tracker).toBe(expected);
    });

    it('builds android tracker preferring custom context than URL parameters', () => {
      const trackerData = {
        template: androidTracker,
        context: { ...androidContext, android_deep_link_path: 'path/{page}' }
      };

      const deeplink = encodeURIComponent('app://path/meow');
      const expected = `https://test.domain/abc123?deep_link=${deeplink}&campaign=banner1&adgroup=en`;

      const tracker = TrackerBuilder.build(trackerData, 'https://some-path/?page=hello', { context: { page: 'meow' } });
      expect(tracker).toBe(expected);
    });
  });

  describe('Campaign parameters', () => {
    it('builds custom tracker', () => {
      const trackerData = {
        template: 'https://{domain}/{tracker}?campaign={utm_source}-{campaign}&adgroup={localization_language}&utm_content={utm_content}',
        context: commonContext
      };

      const expected = 'https://test.domain/abc123?campaign=hello_utm-banner1&adgroup=en&utm_content=image';

      const tracker = TrackerBuilder.build(trackerData, 'https://some-path/?utm_source=hello_utm&utm_content=image', emptyCustomData);
      expect(tracker).toBe(expected);
    });

    it('builds custom tracker ignoring unavailable placeholders in deeplink path', () => {
      const trackerData = {
        template: 'https://{domain}/{deep_link_path}/adj_t={tracker}?adj_campaign={campaign}_{utm_source}&adj_adgroup={localization_language}',
        context: { ...iosContext, ios_deep_link_path: 'some/path-to-{nothing}' }
      };

      const expected = 'https://test.domain/some/path-to-/adj_t=abc123?adj_campaign=banner1_hello&adj_adgroup=en';

      const tracker = TrackerBuilder.build(trackerData, 'https://some-path/?utm_source=hello', emptyCustomData);
      expect(tracker).toBe(expected);
    });
  });
});
