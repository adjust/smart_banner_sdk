import { Logger } from '@sdk/utils/logger';
import { SmartBanner } from '@sdk/domain/smart-banner';
import { DeviceOS } from '@sdk/main';
import { NetworkFactory } from '@sdk/network/network-factory';
import { StorageFactory } from '@sdk/data/storage/storage-factory';
import { InMemoryStorage } from '@sdk/data/storage/in-memory-storage';
import { BannerProvider } from '@sdk/domain/banner-provider';
import * as DataToViewConverter from '@sdk/data/converters/smart-banner-for-view';
import * as DataToTrackerConverter from '@sdk/data/converters/smart-banner-to-tracker-data';
import * as TrackerBuilder from '@sdk/domain/tracker-builder';
import * as LanguageModule from '@sdk/utils/language';
import * as View from '@sdk/view/smart-banner-view';

import serverResponseMock from '../../fake-data/smart_banners_mock.json';

jest.mock('@sdk/utils/logger');

describe('Smart Banner tests', () => {
  const mockHref = 'http://mock/path';
  const originalLocation = window.location;
  const locationMock = (href: string = mockHref) => ({
    ...originalLocation,
    href
  });

  const defaultPlatform = DeviceOS.Android;

  const requestMock = jest.fn().mockResolvedValue(serverResponseMock);

  const smartBannerViewMock = {
    render: jest.fn(),
    destroy: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    update: jest.fn()
  } as any as View.SmartBannerView;

  const defaultLang = serverResponseMock[0].default_language;
  const getLocalization = (locale?: string | null) => {
    const localisations = serverResponseMock[0].localizations as any;
    return locale && localisations[locale] || {};
  };

  const dismissalPeriod = serverResponseMock[0].dismissal_period * 1000;

  const trackerTemplate = 'domain/tracker-template/{adgroup}';
  const tracker = (adgroup: string) => `domain/tracker-template/${adgroup}`;
  const trackerWithDeeplink = (adgroup: string, deeplink: string) => `domain/tracker-template/${adgroup}?deeplink=${deeplink}`;

  const renderDataMock = (locale?: string | null) => ({
    buttonLabel: getLocalization(locale).button_label || serverResponseMock[0].button_label
  } as any); // return the only field because this is just a mock

  const trackerDataMock = (locale?: string | null) => ({
    template: trackerTemplate,
    context: {
      adgroup: getLocalization(locale).context?.adgroup || defaultLang,
    }
  });

  beforeAll(() => {
    jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock());
    jest.spyOn(StorageFactory, 'createStorage').mockReturnValue(new InMemoryStorage());
    jest.spyOn(NetworkFactory, 'create').mockImplementation(() => ({ request: requestMock }));
    jest.spyOn(DataToViewConverter, 'convertSmartBannerDataForView').mockImplementation((_, locale) => renderDataMock(locale));
    jest.spyOn(DataToTrackerConverter, 'convertSmartBannerToTracker').mockImplementation((_, locale) => trackerDataMock(locale));
    jest.spyOn(TrackerBuilder, 'buildSmartBannerUrl');
    jest.spyOn(BannerProvider.prototype, 'fetchBanner');
    jest.spyOn(View, 'SmartBannerView').mockReturnValue(smartBannerViewMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  describe('Initialisation and creation', () => {
    describe('Localisation', () => {
      describe('Detection', () => {
        it('detects preferred language and uses it in view and for deeplink', async () => {
          jest.spyOn(LanguageModule, 'getLanguage').mockReturnValue('ru');

          new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock('ru'), tracker('ru'), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when unable to detect and uses it in view and for deeplink', async () => {
          jest.spyOn(LanguageModule, 'getLanguage').mockReturnValue(null);

          new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), tracker(defaultLang), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when no detected one in the data and uses it in view and for deeplink', async () => {
          jest.spyOn(LanguageModule, 'getLanguage').mockReturnValue('fr');

          new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), tracker(defaultLang), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });
      });

      describe('Parameter passed', () => {
        it('accepts preferred language and uses it in view and for deeplink', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: 'ru' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock('ru'), tracker('ru'), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when no preferred localisation in server response', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: 'fr' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), tracker(defaultLang), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when preferred language is the same as default', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), tracker(defaultLang), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });
      });
    });

    describe('Custom deeplink context', () => {
      const bannerName = serverResponseMock[0].name;

      it('creates tracker without deeplink when no deeplink and context passed', async () => {
        expect.assertions(4);

        new SmartBanner('some-token', { appToken: 'some-token', deeplink: undefined, context: undefined }, defaultPlatform);
        await Utils.flushPromises();

        const trackerUrl = tracker(defaultLang);

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });

      it('ignores context when no deeplink passed and creates tracker without deeplink', async () => {
        expect.assertions(4);

        new SmartBanner('some-token', { appToken: 'some-token', context: { param: 'pam-param' } }, defaultPlatform);
        await Utils.flushPromises();

        const trackerUrl = tracker(defaultLang);

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });

      it('accepts and uses custom deeplink to create a tracker for view', async () => {
        expect.assertions(4);

        new SmartBanner('some-token', { appToken: 'some-token', deeplink: 'some-deeplink' }, defaultPlatform);
        await Utils.flushPromises();

        const trackerUrl = trackerWithDeeplink(defaultLang, 'some-deeplink');

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });

      it('accepts and uses custom deeplink and context to create a tracker for view', async () => {
        expect.assertions(4);

        new SmartBanner('some-token',
          {
            appToken: 'some-token',
            deeplink: 'some-deeplink/param={param}',
            context: { param: 'pam-param' }
          },
          defaultPlatform);
        await Utils.flushPromises();

        const trackerUrl = trackerWithDeeplink(defaultLang, 'some-deeplink%2Fparam%3Dpam-param');

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });

      it('accepts and uses custom deeplink and URL params as a context to create a tracker for view', async () => {
        expect.assertions(4);

        jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock('http://path?param=meow-meow'));

        new SmartBanner('some-token',
          {
            appToken: 'some-token',
            deeplink: 'some-deeplink/param={param}'
          },
          defaultPlatform);
        await Utils.flushPromises();

        const trackerUrl = trackerWithDeeplink(defaultLang, 'some-deeplink%2Fparam%3Dmeow-meow');

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });

      afterAll(() => {
        jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock());
      });
    });

    /*describe('Callbacks', () => {
      describe('onCreated', () => {
        it('is being called after banner renderred for first time', () => {

        });

        it('is being called after banner re-renderred after URL changes', () => {

        });

        it('does not throw if callback throws', () => {

        });
      });

      describe('onDismissed', () => {
        it('is being called when banner dismissed', () => {

        });

        it('does not throw if callback throws', () => {

        });
      });
    });

    describe('Fetching banners', () => {
      const platforms = [DeviceOS.iOS, DeviceOS.Android, DeviceOS.WindowsPC, DeviceOS.WindowsPhone];

      it.each([platforms])('fetches banners for a proper device OS using passed AppToken', () => {
        // expect called with proper platform and app token
      });
    });*/
  });

  describe('Change visibility', () => {
    describe('Hide', () => {
      it('hides view', async () => {
        expect.assertions(2);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);
        await Utils.flushPromises();

        smartbanner.hide();

        expect(Logger.log).toBeCalledWith('Hide banner');
        expect(smartBannerViewMock.hide).toBeCalled();
      });

      it('logs a message when view was not created yet and hides after view is created', async () => {
        expect.assertions(4);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);
        smartbanner.hide();

        expect(Logger.log).toBeCalledWith('Fetching banners now, hide banner after fetch finished');
        expect(smartBannerViewMock.hide).not.toBeCalled();

        await Utils.flushPromises();

        expect(Logger.log).toBeCalledWith('Banners fetch finished, hide Smart banner now');
        expect(smartBannerViewMock.hide).toBeCalled();
      });
    });

    describe('Show', () => {
      it('shows view', async () => {
        expect.assertions(2);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);
        await Utils.flushPromises();

        smartbanner.show();

        expect(Logger.log).toBeCalledWith('Show banner');
        expect(smartBannerViewMock.show).toBeCalled();
      });

      it('logs a message when view was not created yet and shows after view is created', async () => {
        expect.assertions(4);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);
        smartbanner.show();

        expect(Logger.log).toBeCalledWith('Fetching banners now, show banner after fetch finished');
        expect(smartBannerViewMock.show).not.toBeCalled();

        await Utils.flushPromises();

        expect(Logger.log).toBeCalledWith('Banners fetch finished, show Smart banner now');
        expect(smartBannerViewMock.show).toBeCalled();
      });

      it('re-reads current URL, destroys and re-creates the view', async () => {
        expect.assertions(4);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', deeplink: '{location}-location' }, defaultPlatform);
        await Utils.flushPromises();

        jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock('http://path?location=new'));

        smartbanner.show();
        await Utils.flushPromises();

        const trackerLink = trackerWithDeeplink(defaultLang, 'new-location');

        expect(Logger.info).toBeCalledWith('Page address changed');
        expect(smartBannerViewMock.destroy).toBeCalled();
        expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), trackerLink, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
      });

      afterAll(() => {
        jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock());
      });
    });

  });

  describe('Language setting', () => {
    describe('View exists', () => {
      it.each([
        { initLang: undefined, newLang: 'ru' },
        { initLang: 'ru', newLang: 'de' },
        { initLang: 'ru', newLang: 'en' }
      ])('updates the view with localised strings', async ({ initLang, newLang }) => {
        expect.assertions(1);

        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token', language: initLang }, defaultPlatform);
        await Utils.flushPromises();

        smartBanner.setLanguage(newLang);
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).toBeCalledWith(renderDataMock(newLang), tracker(newLang));
      });

      it('does not select a new banner to show', async () => {
        expect.assertions(2);

        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        await Utils.flushPromises();

        expect(BannerProvider.prototype.fetchBanner).toBeCalled();

        smartBanner.setLanguage('ru');
        await Utils.flushPromises();

        expect(BannerProvider.prototype.fetchBanner).toBeCalledTimes(1);
      });
    });

    describe('View creation scheduled', () => {
      const testStartedAt = Date.now();
      const recordId = serverResponseMock[0].id;
      const bannerName = serverResponseMock[0].name;
      const storage = new InMemoryStorage();

      beforeAll(() => {
        storage.setItem(recordId, testStartedAt);
        jest.spyOn(StorageFactory, 'createStorage').mockReturnValue(storage);
        jest.useFakeTimers();
      });

      afterAll(() => {
        storage.removeItem(recordId);
        jest.spyOn(StorageFactory, 'createStorage').mockReturnValue(new InMemoryStorage());
        jest.useRealTimers();
      });

      it('schedules a new creation of banner with updated language', async () => {
        expect.assertions(7);

        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        await Utils.flushPromises();

        expect(Logger.info).toBeCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(testStartedAt + dismissalPeriod)}`);

        smartBanner.setLanguage('ru');
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).not.toBeCalled();
        expect(Logger.log).toBeCalledWith('Clearing previously scheduled creation of a Smart banner');
        expect(Logger.info).toBeCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(testStartedAt + dismissalPeriod)}`);

        jest.runOnlyPendingTimers();

        expect(View.SmartBannerView).toBeCalledWith(renderDataMock('ru'), tracker('ru'), expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.info).lastCalledWith('Render banner: ' + bannerName);
      });
    });

    describe('Initialisation is not finished yet', () => {
      it('logs a message that language will be applied within initialisation', () => {
        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        smartBanner.setLanguage('ru');

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the chosen language will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();
      });

      it.each([
        { initLang: undefined, newLang: 'ru' },
        { initLang: 'ru', newLang: 'de' },
        { initLang: 'ru', newLang: 'en' }
      ])('applies the language within initialisation', async ({ initLang, newLang }) => {
        expect.assertions(3);

        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token', language: initLang }, defaultPlatform);
        smartBanner.setLanguage(newLang);
        await Utils.flushPromises();

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the chosen language will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();
        expect(View.SmartBannerView).toBeCalledWith(renderDataMock(newLang), tracker(newLang), expect.any(Function));
      });
    });
  });

  describe('Deeplink context setting', () => {
    const testSet = [
      {
        _action: 'sets custom deeplink',
        initContext: undefined,
        newContext: { deeplink: 'new-path' },
        deeplink: encodeURIComponent('new-path')
      },
      {
        _action: 'sets custom context',
        initContext: { deeplink: 'some-path/param={param}' },
        newContext: { context: { param: 'meow' } },
        deeplink: encodeURIComponent('some-path/param=meow')
      },
      {
        _action: 'cleans both deeplink and context',
        initContext: { deeplink: 'some-path', context: { param: 'meow' } },
        newContext: {},
        deeplink: undefined
      },
      {
        _action: 'sets a new deeplink',
        initContext: { deeplink: 'some-path' },
        newContext: { deeplink: 'new-path' },
        deeplink: encodeURIComponent('new-path')
      },
      {
        _action: 'sets a new context and preserves deeplink',
        initContext: { deeplink: 'some-path/param={param}', context: { param: 'old' } },
        newContext: { context: { param: 'new' } },
        deeplink: encodeURIComponent('some-path/param=new')
      },
      {
        _action: 'sets a new deeplink and preserves context',
        initContext: { deeplink: 'some-path/param={param}', context: { param: 'old' } },
        newContext: { deeplink: 'new-path/param={param}' },
        deeplink: encodeURIComponent('new-path/param=old')
      },
      {
        _action: 'sets both new deeplink and context',
        initContext: { deeplink: 'some-path/param={param}', context: { param: 'old' } },
        newContext: { deeplink: 'new-path/param={greet}', context: { greet: 'hi' } },
        deeplink: encodeURIComponent('new-path/param=hi')
      },
    ];

    describe('View exists', () => {
      it.each(testSet)('$_action, updates the view with new tracker url', async ({ _action, initContext, newContext, deeplink }) => {
        expect.assertions(1);

        const smartBanner = new SmartBanner('some-token',
          {
            appToken: 'some-token',
            deeplink: initContext?.deeplink,
            context: initContext?.context
          },
          defaultPlatform);
        await Utils.flushPromises();

        smartBanner.setDeeplinkContext(newContext as any);
        await Utils.flushPromises();

        const trackerUrl = deeplink ?
          trackerWithDeeplink(defaultLang, deeplink) :
          tracker(defaultLang);

        expect(smartBannerViewMock.update).toBeCalledWith(renderDataMock(defaultLang), trackerUrl);
      });

      it.each(testSet)('does not select a new banner to show when deeplink context updated', async ({ initContext, newContext }) => {
        expect.assertions(2);

        const smartBanner = new SmartBanner('some-token',
          {
            appToken: 'some-token',
            deeplink: initContext?.deeplink,
            context: initContext?.context
          },
          defaultPlatform);
        await Utils.flushPromises();

        expect(BannerProvider.prototype.fetchBanner).toBeCalled();

        smartBanner.setDeeplinkContext(newContext as any);
        await Utils.flushPromises();

        expect(BannerProvider.prototype.fetchBanner).toBeCalledTimes(1);
      });
    });

    describe('View creation scheduled', () => {
      let startTime = Date.now();
      const testStartedAt = () => startTime;
      const bannerName = serverResponseMock[0].name;
      const recordId = serverResponseMock[0].id;
      const storage = new InMemoryStorage();

      beforeEach(() => {
        startTime = Date.now();
        storage.setItem(recordId, testStartedAt());
        jest.spyOn(StorageFactory, 'createStorage').mockReturnValue(storage);
        jest.useFakeTimers();
      });

      afterEach(() => {
        storage.removeItem(recordId);
        jest.spyOn(StorageFactory, 'createStorage').mockReturnValue(new InMemoryStorage());
        jest.useRealTimers();
      });

      it.each(testSet)('schedules a new creation of banner with updated deeplink context', async ({ initContext, newContext, deeplink }) => {
        expect.assertions(7);

        const smartBanner = new SmartBanner('some-token',
          {
            appToken: 'some-token',
            deeplink: initContext?.deeplink,
            context: initContext?.context
          },
          defaultPlatform);
        await Utils.flushPromises();

        expect(Logger.info).toBeCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(testStartedAt() + dismissalPeriod)}`);

        smartBanner.setDeeplinkContext(newContext as any);
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).not.toBeCalled();
        expect(Logger.log).toBeCalledWith('Clearing previously scheduled creation of a Smart banner');
        expect(Logger.info).toBeCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(testStartedAt() + dismissalPeriod)}`);

        jest.runOnlyPendingTimers();

        const trackerUrl = deeplink ?
          trackerWithDeeplink(defaultLang, deeplink) :
          tracker(defaultLang);

        expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.info).lastCalledWith('Render banner: ' + bannerName);
      });
    });

    describe('Initialisation is not finished yet', () => {
      it('logs a message that deeplink context will be applied within initialisation', () => {
        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        smartBanner.setDeeplinkContext({ deeplink: 'my-deeplink' });

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the provided deeplink context will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();
      });

      it.each(testSet)('applies the deeplink context within initialisation', async ({ initContext, newContext, deeplink }) => {
        expect.assertions(3);

        const smartBanner = new SmartBanner('some-token',
          {
            appToken: 'some-token',
            deeplink: initContext?.deeplink,
            context: initContext?.context
          },
          defaultPlatform);
        smartBanner.setDeeplinkContext(newContext as any);
        await Utils.flushPromises();

        const trackerUrl = deeplink ?
          trackerWithDeeplink(defaultLang, deeplink) :
          tracker(defaultLang);

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the provided deeplink context will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();
        expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
      });
    });
  });

});
