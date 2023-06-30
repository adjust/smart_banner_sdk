import { Logger } from '@sdk/utils/logger';
import { SmartBanner } from '@sdk/domain/smart-banner';
import { DeviceOS } from '@sdk/main';
import { NetworkFactory } from '@sdk/network/network-factory';
import { StorageFactory } from '@sdk/data/storage/storage-factory';
import { InMemoryStorage } from '@sdk/data/storage/in-memory-storage';
import { BannerProvider } from '@sdk/domain/banner-provider';
import * as DataToViewConverter from '@sdk/data/converters/smart-banner-for-view';
import * as TrackerBuilder from '@sdk/domain/tracker-builder';
import * as LanguageModule from '@sdk/utils/language';
import { SmartBannerLayout, SmartBannerLayoutFactory } from '@layout';

import serverResponseMock from '../../fake-data/smart_banners_mock.json';

jest.mock('@sdk/utils/logger');

describe('Smart Banner tests', () => {
  const mockHref = 'http://mock/path';
  const originalLocation = window.location;
  const locationMock = (href: string = mockHref) => ({
    ...originalLocation,
    href
  });

  const defaultTrackerData = serverResponseMock[0].tracker_url;

  const defaultPlatform = DeviceOS.Android;

  const requestMock = jest.fn().mockResolvedValue(serverResponseMock);

  const smartBannerViewMock = {
    render: jest.fn(),
    destroy: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    update: jest.fn()
  } as SmartBannerLayout;

  const defaultLang = serverResponseMock[0].default_language;
  const getLocalization = (locale?: string | null) => {
    const localisations = serverResponseMock[0].localizations as any;
    return locale && localisations[locale] || {};
  };

  const dismissalPeriod = serverResponseMock[0].dismissal_period * 1000;

  const renderDataMock = (locale?: string | null) => ({
    buttonText: getLocalization(locale).button_label || serverResponseMock[0].button_label
  } as any); // return the only field because this is just a mock

  const trackerMock = jest.fn().mockReturnValue('deeplink');

  beforeAll(() => {
    jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock());
    jest.spyOn(StorageFactory, 'createStorage').mockReturnValue(new InMemoryStorage());
    jest.spyOn(NetworkFactory, 'create').mockImplementation(() => ({ request: requestMock }));
    jest.spyOn(DataToViewConverter, 'convertSmartBannerDataForView').mockImplementation((_, locale) => renderDataMock(locale));
    jest.spyOn(TrackerBuilder, 'buildSmartBannerUrl').mockImplementation(trackerMock);
    jest.spyOn(BannerProvider.prototype, 'fetchBanner');
    jest.spyOn(SmartBannerLayoutFactory, 'createViewForSdk').mockReturnValue(smartBannerViewMock);
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
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock('ru'), trackerMock('ru'), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when unable to detect and uses it in view and for deeplink', async () => {
          jest.spyOn(LanguageModule, 'getLanguage').mockReturnValue(null);

          new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock(defaultLang), trackerMock(defaultLang), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when no detected one in the data and uses it in view and for deeplink', async () => {
          jest.spyOn(LanguageModule, 'getLanguage').mockReturnValue('fr');

          new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock(defaultLang), trackerMock(defaultLang), expect.any(Function));
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
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock('ru'), trackerMock('ru'), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when no preferred localisation in server response', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: 'fr' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock(defaultLang), trackerMock(defaultLang), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when preferred language is the same as default', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock(defaultLang), trackerMock(defaultLang), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });
      });
    });

    describe('Custom deeplink', () => {
      const emptyCustomContext = {
        androidAppSchema: undefined,
        context: {},
        deepLinkPath: undefined,
      };
      const bannerName = serverResponseMock[0].title;

      it('creates tracker without deeplink when no deeplink and context passed', async () => {
        expect.assertions(5);

        new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        await Utils.flushPromises();

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(expect.objectContaining({}), mockHref, emptyCustomContext);
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });

      it('ignores context when no deeplink passed and creates tracker without deeplink', async () => {
        expect.assertions(5);

        new SmartBanner('some-token', { appToken: 'some-token', context: { param: 'pam-param' } }, defaultPlatform);
        await Utils.flushPromises();

        const trackerUrl = trackerMock(defaultLang);

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(
          expect.objectContaining({}),
          mockHref,
          { ...emptyCustomContext, context: { param: 'pam-param' } });
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });

      it('accepts and uses custom deep link path to create a tracker for view', async () => {
        expect.assertions(5);

        new SmartBanner('some-token', { appToken: 'some-token', deepLinkPath: 'some-deeplink' }, defaultPlatform);
        await Utils.flushPromises();

        const trackerUrl = trackerMock(defaultLang, 'some-deeplink');

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(
          defaultTrackerData,
          mockHref,
          { ...emptyCustomContext, deepLinkPath: 'some-deeplink' });
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });

      it('accepts and uses custom deeplink and context to create a tracker for view', async () => {
        expect.assertions(5);

        new SmartBanner('some-token',
          {
            appToken: 'some-token',
            deepLinkPath: 'some-deeplink/{param}',
            context: { param: 'pam-param' }
          },
          defaultPlatform);
        await Utils.flushPromises();

        const trackerUrl = trackerMock(defaultLang, 'some-deeplink/pam-param');

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(
          defaultTrackerData,
          mockHref,
          {
            ...emptyCustomContext,
            deepLinkPath: 'some-deeplink/{param}',
            context: { param: 'pam-param' }
          });
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock(defaultLang), trackerUrl, expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });

      it('accepts and uses custom deeplink and URL params as a context to create a tracker for view', async () => {
        expect.assertions(5);

        jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock('http://path?param=meow-meow'));

        new SmartBanner('some-token',
          {
            appToken: 'some-token',
            deepLinkPath: 'some-deeplink/param={param}'
          },
          defaultPlatform);
        await Utils.flushPromises();

        expect(Logger.info).toBeCalledWith('Render banner: ' + bannerName);
        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(
          defaultTrackerData,
          'http://path?param=meow-meow',
          { ...emptyCustomContext, deepLinkPath: 'some-deeplink/param={param}' });
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalled();
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

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', deepLinkPath: '{location}-location' }, defaultPlatform);
        await Utils.flushPromises();

        jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock('http://path?location=new'));

        smartbanner.show();
        await Utils.flushPromises();

        expect(Logger.info).toBeCalledWith('Page address changed');
        expect(smartBannerViewMock.destroy).toBeCalled();
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalled();
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

        expect(smartBannerViewMock.update).toBeCalledWith(renderDataMock(newLang), trackerMock(newLang));
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
      const bannerName = serverResponseMock[0].title;
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

        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock('ru'), trackerMock('ru'), expect.any(Function));
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
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalledWith(renderDataMock(newLang), trackerMock(newLang), expect.any(Function));
      });
    });
  });

  describe('Deeplink context setting', () => {
    describe('View exists', () => {
      it('updates tracker using new custom deeplink data', async () => {
        expect.assertions(5);

        const smartBanner = new SmartBanner(
          'some-token',
          { appToken: 'some-token', androidAppSchema: 'app', deepLinkPath: 'old/path' },
          defaultPlatform);
        await Utils.flushPromises();

        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(
          defaultTrackerData, mockHref,
          { context: {}, androidAppSchema: 'app', deepLinkPath: 'old/path' }
        );

        smartBanner.setAppSchema('new');
        await Utils.flushPromises();

        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(
          defaultTrackerData, mockHref,
          { context: {}, androidAppSchema: 'new', deepLinkPath: 'old/path' }
        );
        expect(smartBannerViewMock.update).toBeCalled();

        smartBanner.setDeepLinkPath('new/path');
        await Utils.flushPromises();

        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(
          defaultTrackerData, mockHref,
          { context: {}, androidAppSchema: 'new', deepLinkPath: 'new/path' }
        );
        expect(smartBannerViewMock.update).toBeCalled();
      });
    });

    describe('View creation scheduled', () => {
      let startTime = Date.now();
      const bannerName = serverResponseMock[0].title;
      const recordId = serverResponseMock[0].id;
      const storage = new InMemoryStorage();

      beforeEach(() => {
        startTime = Date.now();
        storage.setItem(recordId, startTime);
        jest.spyOn(StorageFactory, 'createStorage').mockReturnValue(storage);
        jest.useFakeTimers();
      });

      afterEach(() => {
        storage.removeItem(recordId);
        jest.spyOn(StorageFactory, 'createStorage').mockReturnValue(new InMemoryStorage());
        jest.useRealTimers();
      });

      it('schedules a new creation of banner with custom deep link data', async () => {
        expect.assertions(14);

        const smartBanner = new SmartBanner(
          'some-token',
          { appToken: 'some-token', androidAppSchema: 'app', deepLinkPath: 'old/path' },
          defaultPlatform);
        await Utils.flushPromises();

        expect(Logger.info).toBeCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(startTime + dismissalPeriod)}`);

        smartBanner.setAppSchema('new');
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).not.toBeCalled();
        expect(Logger.log).toBeCalledWith('Clearing previously scheduled creation of a Smart banner');
        expect(Logger.info).toBeCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(startTime + dismissalPeriod)}`);

        smartBanner.setDeepLinkPath('some/path');
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).not.toBeCalled();
        expect(Logger.log).toBeCalledWith('Clearing previously scheduled creation of a Smart banner');
        expect(Logger.info).toBeCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(startTime + dismissalPeriod)}`);

        smartBanner.setContext({ product: 'something' });
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).not.toBeCalled();
        expect(Logger.log).toBeCalledWith('Clearing previously scheduled creation of a Smart banner');
        expect(Logger.info).toBeCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(startTime + dismissalPeriod)}`);

        jest.runOnlyPendingTimers();

        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(
          defaultTrackerData, mockHref,
          { androidAppSchema: 'new', deepLinkPath: 'some/path', context: { product: 'something' } }
        );
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalled();
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.info).lastCalledWith('Render banner: ' + bannerName);
      });
    });

    describe('Initialisation is not finished yet', () => {
      it('logs a message that app schema will be applied within initialisation', () => {
        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        smartBanner.setAppSchema('app');

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the provided app schema will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();
      });

      it('applies app schema within initialisation', async () => {
        expect.assertions(5);

        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        smartBanner.setAppSchema('new-schema');

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the provided app schema will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();

        await Utils.flushPromises();

        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(defaultTrackerData, mockHref, { androidAppSchema: 'new-schema', context: {}, deepLinkPath: undefined });
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalled();
        expect(smartBannerViewMock.render).toBeCalled();
      });

      it('logs a message that deep link path will be applied within initialisation', () => {
        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        smartBanner.setDeepLinkPath('some/path');

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the provided deeplink path will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();
      });

      it('applies deep link path within initialisation', async () => {
        expect.assertions(5);

        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        smartBanner.setDeepLinkPath('new/path');

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the provided deeplink path will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();

        await Utils.flushPromises();

        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(defaultTrackerData, mockHref, { deepLinkPath: 'new/path', androidAppSchema: undefined, context: {} });
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalled();
        expect(smartBannerViewMock.render).toBeCalled();
      });

      it('logs a message that deeplink context will be applied within initialisation', () => {
        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        smartBanner.setContext({ product: 'something' });

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the provided deeplink context will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();
      });

      it('applies deeplink context within initialisation', async () => {
        expect.assertions(5);

        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        smartBanner.setContext({ product: 'something' });

        expect(Logger.log).toBeCalledWith('Smart banner was not created yet, the provided deeplink context will be applied within creation');
        expect(smartBannerViewMock.update).not.toBeCalled();

        await Utils.flushPromises();

        expect(TrackerBuilder.buildSmartBannerUrl).toBeCalledWith(
          defaultTrackerData, mockHref,
          { context: { product: 'something' }, deepLinkPath: undefined, androidAppSchema: undefined }
        );
        expect(SmartBannerLayoutFactory.createViewForSdk).toBeCalled();
        expect(smartBannerViewMock.render).toBeCalled();
      });
    });
  });

});
