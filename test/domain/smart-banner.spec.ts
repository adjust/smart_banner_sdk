import { Logger } from '@sdk/utils/logger';
import { SmartBanner } from '@sdk/domain/smart-banner';
import { Platform } from '@sdk/main';
import { NetworkFactory } from '@sdk/network/network-factory';
import { StorageFactory } from '@sdk/data/storage/storage-factory';
import { InMemoryStorage } from '@sdk/data/storage/in-memory-storage';
import { BannerProvider } from '@sdk/domain/banner-provider';
import * as DataToViewConverter from '@sdk/data/converters/smart-banner-for-view';
import { TrackerBuilder } from '@sdk/domain/link-builder/tracker-builder';
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

  const requestMock = jest.fn().mockResolvedValue(serverResponseMock);

  const smartBannerViewMock = {
    render: jest.fn(),
    destroy: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    update: jest.fn()
  } as SmartBannerLayout;

  const defaultLang = 'en';
  const getLocalization = (locale?: string | null) => {
    const localisations = serverResponseMock[0].localizations as any;
    return locale && localisations[locale] || {};
  };

  const dismissalPeriod = serverResponseMock[0].dismissal_period * 1000;

  const renderDataMock = (locale?: string | null) => ({
    buttonText: getLocalization(locale).button_label || serverResponseMock[0].button_text
  } as any); // return the only field because this is just a mock

  beforeAll(() => {
    jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock());
    jest.spyOn(StorageFactory, 'createStorage').mockReturnValue(new InMemoryStorage());
    jest.spyOn(NetworkFactory, 'create').mockImplementation(() => ({ request: requestMock }));
    jest.spyOn(DataToViewConverter, 'convertSmartBannerDataForView').mockImplementation((_, locale) => renderDataMock(locale));
    jest.spyOn(TrackerBuilder, 'build').mockImplementation(() => '');
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
      const defaultPlatform = Platform.Android;

      describe('Detection', () => {
        it('detects preferred language and uses it in view and for deeplink', async () => {
          jest.spyOn(LanguageModule, 'getLanguage').mockReturnValue('ru');

          new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).toHaveBeenCalled();
          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock('ru'), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('uses default language when unable to detect and uses it in view and for deeplink', async () => {
          jest.spyOn(LanguageModule, 'getLanguage').mockReturnValue(null);

          new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).toHaveBeenCalled();
          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('uses default language when no detected one in the data and uses it in view and for deeplink', async () => {
          jest.spyOn(LanguageModule, 'getLanguage').mockReturnValue('fr');

          new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).toHaveBeenCalled();
          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });
      });

      describe('Parameter passed', () => {
        it('accepts preferred language and uses it in view and for deeplink', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: 'ru' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toHaveBeenCalled();
          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock('ru'), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('uses default language when no preferred localisation in server response', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: 'fr' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toHaveBeenCalled();
          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('uses default language when preferred language is the same as default', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toHaveBeenCalled();
          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + serverResponseMock[0].title);
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });
      });
    });

    describe('Custom deeplink', () => {
      afterEach(() => {
        jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock());
      });

      describe('Android', () => {
        const emptyCustomContext = {
          androidDeepLinkPath: undefined,
          context: {},
        };
        const bannerName = serverResponseMock[0].title;

        it('creates tracker without deeplink when no deeplink and context passed', async () => {
          expect.assertions(5);

          new SmartBanner('some-token', { appToken: 'some-token' }, Platform.Android);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(expect.objectContaining({}), mockHref, emptyCustomContext);
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('ignores context when no deeplink passed and creates tracker without deeplink', async () => {
          expect.assertions(5);

          new SmartBanner('some-token', { appToken: 'some-token', context: { param: 'pam-param' } }, Platform.Android);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            expect.objectContaining({}),
            mockHref,
            { ...emptyCustomContext, context: { param: 'pam-param' } });
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('accepts and uses custom deep link path to create a tracker for view', async () => {
          expect.assertions(5);

          new SmartBanner('some-token', { appToken: 'some-token', androidDeepLinkPath: 'some-deeplink' }, Platform.Android);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            { ...emptyCustomContext, androidDeepLinkPath: 'some-deeplink' });
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('accepts and uses custom deeplink and context to create a tracker for view', async () => {
          expect.assertions(5);

          new SmartBanner('some-token',
            {
              appToken: 'some-token',
              androidDeepLinkPath: 'some-deeplink/{param}',
              context: { param: 'pam-param' }
            },
            Platform.Android);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            {
              ...emptyCustomContext,
              androidDeepLinkPath: 'some-deeplink/{param}',
              context: { param: 'pam-param' }
            });
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('accepts and uses custom deeplink and URL params as a context to create a tracker for view', async () => {
          expect.assertions(5);

          jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock('http://path?param=meow-meow'));

          new SmartBanner('some-token',
            {
              appToken: 'some-token',
              androidDeepLinkPath: 'some-deeplink/param={param}'
            },
            Platform.Android);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            'http://path?param=meow-meow',
            { ...emptyCustomContext, androidDeepLinkPath: 'some-deeplink/param={param}' });
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalled();
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });
      });

      describe('iOS', () => {
        const emptyCustomContext = {
          iosDeepLinkPath: undefined,
          context: {}
        };
        const bannerName = serverResponseMock[0].title;

        it('creates tracker without deeplink when no deeplink and context passed', async () => {
          expect.assertions(5);

          new SmartBanner('some-token', { appToken: 'some-token' }, Platform.iOS);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            expect.objectContaining({}),
            mockHref,
            emptyCustomContext
          );
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('ignores context when no deeplink passed and creates tracker without deeplink', async () => {
          expect.assertions(5);

          new SmartBanner('some-token', { appToken: 'some-token', context: { param: 'pam-param' } }, Platform.iOS);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            expect.objectContaining({}),
            mockHref,
            { ...emptyCustomContext, context: { param: 'pam-param' } });
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('accepts and uses custom deep link path to create a tracker for view', async () => {
          expect.assertions(5);

          new SmartBanner('some-token', { appToken: 'some-token', iosDeepLinkPath: 'some-deeplink' }, Platform.iOS);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            { ...emptyCustomContext, iosDeepLinkPath: 'some-deeplink' });
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('accepts and uses custom deeplink and context to create a tracker for view', async () => {
          expect.assertions(5);

          new SmartBanner('some-token',
            {
              appToken: 'some-token',
              iosDeepLinkPath: 'some-deeplink/{param}',
              context: { param: 'pam-param' }
            },
            Platform.iOS);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            {
              ...emptyCustomContext,
              iosDeepLinkPath: 'some-deeplink/{param}',
              context: { param: 'pam-param' }
            });
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(defaultLang), expect.any(String), expect.any(String), expect.any(Function));
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });

        it('accepts and uses custom deeplink and URL params as a context to create a tracker for view', async () => {
          expect.assertions(5);

          jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock('http://path?param=meow-meow'));

          new SmartBanner('some-token',
            {
              appToken: 'some-token',
              iosDeepLinkPath: 'some-deeplink/param={param}'
            },
            Platform.iOS);
          await Utils.flushPromises();

          expect(Logger.info).toHaveBeenCalledWith('Render banner: ' + bannerName);
          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            'http://path?param=meow-meow',
            { ...emptyCustomContext, iosDeepLinkPath: 'some-deeplink/param={param}' });
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalled();
          expect(smartBannerViewMock.render).toHaveBeenCalled();
          expect(Logger.log).toHaveBeenCalledWith('Smart banner rendered');
        });
      });
    });
  });

  describe('Change visibility', () => {
    const defaultPlatform = Platform.Android;

    describe('Hide', () => {
      it('hides view', async () => {
        expect.assertions(2);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);
        await Utils.flushPromises();

        smartbanner.hide();

        expect(Logger.log).toHaveBeenCalledWith('Hide banner');
        expect(smartBannerViewMock.hide).toHaveBeenCalled();
      });

      it('logs a message when view was not created yet and hides after view is created', async () => {
        expect.assertions(4);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);
        smartbanner.hide();

        expect(Logger.log).toHaveBeenCalledWith('Fetching banners now, hide banner after fetch finished');
        expect(smartBannerViewMock.hide).not.toHaveBeenCalled();

        await Utils.flushPromises();

        expect(Logger.log).toHaveBeenCalledWith('Banners fetch finished, hide Smart banner now');
        expect(smartBannerViewMock.hide).toHaveBeenCalled();
      });
    });

    describe('Show', () => {
      it('shows view', async () => {
        expect.assertions(2);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);
        await Utils.flushPromises();

        smartbanner.show();

        expect(Logger.log).toHaveBeenCalledWith('Show banner');
        expect(smartBannerViewMock.show).toHaveBeenCalled();
      });

      it('logs a message when view was not created yet and shows after view is created', async () => {
        expect.assertions(4);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', language: defaultLang }, defaultPlatform);
        smartbanner.show();

        expect(Logger.log).toHaveBeenCalledWith('Fetching banners now, show banner after fetch finished');
        expect(smartBannerViewMock.show).not.toHaveBeenCalled();

        await Utils.flushPromises();

        expect(Logger.log).toHaveBeenCalledWith('Banners fetch finished, show Smart banner now');
        expect(smartBannerViewMock.show).toHaveBeenCalled();
      });

      it('re-reads current URL, destroys and re-creates the view', async () => {
        expect.assertions(4);

        const smartbanner = new SmartBanner('some-token', { appToken: 'some-token', androidDeepLinkPath: '{location}-location' }, defaultPlatform);
        await Utils.flushPromises();

        jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock('http://path?location=new'));

        smartbanner.show();
        await Utils.flushPromises();

        expect(Logger.info).toHaveBeenCalledWith('Page address changed');
        expect(smartBannerViewMock.destroy).toHaveBeenCalled();
        expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalled();
        expect(smartBannerViewMock.render).toHaveBeenCalled();
      });

      afterAll(() => {
        jest.spyOn(window, 'location', 'get').mockImplementation(() => locationMock());
      });
    });

  });

  describe('Language setting', () => {
    const defaultPlatform = Platform.Android;

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

        expect(smartBannerViewMock.update).toHaveBeenCalledWith(renderDataMock(newLang), '', '');
      });

      it('does not select a new banner to show', async () => {
        expect.assertions(2);

        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        await Utils.flushPromises();

        expect(BannerProvider.prototype.fetchBanner).toHaveBeenCalled();

        smartBanner.setLanguage('ru');
        await Utils.flushPromises();

        expect(BannerProvider.prototype.fetchBanner).toHaveBeenCalledTimes(1);
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

        expect(Logger.info).toHaveBeenCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(testStartedAt + dismissalPeriod)}`);

        smartBanner.setLanguage('ru');
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).not.toHaveBeenCalled();
        expect(Logger.log).toHaveBeenCalledWith('Clearing previously scheduled creation of a Smart banner');
        expect(Logger.info).toHaveBeenCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(testStartedAt + dismissalPeriod)}`);

        jest.runOnlyPendingTimers();

        expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock('ru'), expect.any(String), expect.any(String), expect.any(Function));
        expect(smartBannerViewMock.render).toHaveBeenCalled();
        expect(Logger.info).toHaveBeenLastCalledWith('Render banner: ' + bannerName);
      });
    });

    describe('Initialisation is not finished yet', () => {
      it('logs a message that language will be applied within initialisation', () => {
        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);
        smartBanner.setLanguage('ru');

        expect(Logger.log).toHaveBeenCalledWith('Smart banner was not rendered yet, the chosen language will be applied within render');
        expect(smartBannerViewMock.update).not.toHaveBeenCalled();
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

        expect(Logger.log).toHaveBeenCalledWith('Smart banner was not rendered yet, the chosen language will be applied within render');
        expect(smartBannerViewMock.update).not.toHaveBeenCalled();
        expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalledWith(renderDataMock(newLang), expect.any(String), expect.any(String), expect.any(Function));
      });
    });
  });

  describe('Deeplink context setting', () => {
    describe('View exists', () => {
      describe('Android', () => {
        it('updates tracker using new custom deeplink data', async () => {
          expect.assertions(3);

          const smartBanner = new SmartBanner(
            'some-token',
            { appToken: 'some-token', androidDeepLinkPath: 'old/path' },
            Platform.Android);
          await Utils.flushPromises();

          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            { context: {}, androidDeepLinkPath: 'old/path' }
          );


          smartBanner.setAndroidDeepLinkPath('new/path');
          await Utils.flushPromises();

          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            { context: {}, androidDeepLinkPath: 'new/path' }
          );
          expect(smartBannerViewMock.update).toHaveBeenCalled();
        });
      });

      describe('iOS', () => {
        it('updates tracker using new custom deeplink data', async () => {
          expect.assertions(3);

          const smartBanner = new SmartBanner(
            'some-token',
            { appToken: 'some-token', iosDeepLinkPath: 'old/path' },
            Platform.iOS);
          await Utils.flushPromises();

          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            { context: {}, iosDeepLinkPath: 'old/path' }
          );

          smartBanner.setIosDeepLinkPath('new/path');
          await Utils.flushPromises();

          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            { context: {}, iosDeepLinkPath: 'new/path' }
          );
          expect(smartBannerViewMock.update).toHaveBeenCalled();
        });
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
          { appToken: 'some-token', androidDeepLinkPath: 'old/android/path', iosDeepLinkPath: 'old/ios/path' },
          Platform.Android);
        await Utils.flushPromises();

        expect(Logger.info).toHaveBeenCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(startTime + dismissalPeriod)}`);


        smartBanner.setAndroidDeepLinkPath('new/android/path');
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).not.toHaveBeenCalled();
        expect(Logger.log).toHaveBeenCalledWith('Clearing previously scheduled creation of a Smart banner');
        expect(Logger.info).toHaveBeenCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(startTime + dismissalPeriod)}`);

        smartBanner.setIosDeepLinkPath('new/ios/path');
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).not.toHaveBeenCalled();
        expect(Logger.log).toHaveBeenCalledWith('Clearing previously scheduled creation of a Smart banner');
        expect(Logger.info).toHaveBeenCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(startTime + dismissalPeriod)}`);

        smartBanner.setContext({ product: 'something' });
        await Utils.flushPromises();

        expect(smartBannerViewMock.update).not.toHaveBeenCalled();
        expect(Logger.log).toHaveBeenCalledWith('Clearing previously scheduled creation of a Smart banner');
        expect(Logger.info).toHaveBeenCalledWith(`Smart banner ${bannerName} creation scheduled on ${new Date(startTime + dismissalPeriod)}`);

        jest.runOnlyPendingTimers();

        expect(TrackerBuilder.build).toHaveBeenCalledWith(
          defaultTrackerData,
          mockHref,
          { androidDeepLinkPath: 'new/android/path', iosDeepLinkPath: 'new/ios/path', context: { product: 'something' } }
        );
        expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalled();
        expect(smartBannerViewMock.render).toHaveBeenCalled();
        expect(Logger.info).toHaveBeenLastCalledWith('Render banner: ' + bannerName);
      });
    });

    describe('Initialisation is not finished yet', () => {
      describe('Android', () => {
        it('logs a message that deep link path will be applied within initialisation', () => {
          const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, Platform.Android);
          smartBanner.setAndroidDeepLinkPath('some/path');

          expect(Logger.log).toHaveBeenCalledWith('Smart banner was not rendered yet, the provided Android deeplink path will be applied within render');
          expect(smartBannerViewMock.update).not.toHaveBeenCalled();
        });

        it('applies deep link path within initialisation', async () => {
          expect.assertions(5);

          const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, Platform.Android);
          smartBanner.setAndroidDeepLinkPath('new/path');

          expect(Logger.log).toHaveBeenCalledWith('Smart banner was not rendered yet, the provided Android deeplink path will be applied within render');
          expect(smartBannerViewMock.update).not.toHaveBeenCalled();

          await Utils.flushPromises();

          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            { androidDeepLinkPath: 'new/path', context: {} }
          );
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalled();
          expect(smartBannerViewMock.render).toHaveBeenCalled();
        });
      });

      describe('iOS', () => {
        it('logs a message that deep link path will be applied within initialisation', () => {
          const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, Platform.iOS);
          smartBanner.setIosDeepLinkPath('some/path');

          expect(Logger.log).toHaveBeenCalledWith('Smart banner was not rendered yet, the provided iOS deeplink path will be applied within render');
          expect(smartBannerViewMock.update).not.toHaveBeenCalled();
        });

        it('applies deep link path within initialisation', async () => {
          expect.assertions(5);

          const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, Platform.iOS);
          smartBanner.setIosDeepLinkPath('new/path');

          expect(Logger.log).toHaveBeenCalledWith('Smart banner was not rendered yet, the provided iOS deeplink path will be applied within render');
          expect(smartBannerViewMock.update).not.toHaveBeenCalled();

          await Utils.flushPromises();

          expect(TrackerBuilder.build).toHaveBeenCalledWith(
            defaultTrackerData,
            mockHref,
            { iosDeepLinkPath: 'new/path', context: {} }
          );
          expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalled();
          expect(smartBannerViewMock.render).toHaveBeenCalled();
        });
      });

      it('logs a message that deeplink context will be applied within initialisation', () => {
        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, Platform.iOS);
        smartBanner.setContext({ product: 'something' });

        expect(Logger.log).toHaveBeenCalledWith('Smart banner was not rendered yet, the provided deeplink context will be applied within render');
        expect(smartBannerViewMock.update).not.toHaveBeenCalled();
      });

      it('applies deeplink context within initialisation', async () => {
        expect.assertions(5);

        const smartBanner = new SmartBanner('some-token', { appToken: 'some-token' }, Platform.iOS);
        smartBanner.setContext({ product: 'something' });

        expect(Logger.log).toHaveBeenCalledWith('Smart banner was not rendered yet, the provided deeplink context will be applied within render');
        expect(smartBannerViewMock.update).not.toHaveBeenCalled();

        await Utils.flushPromises();

        expect(TrackerBuilder.build).toHaveBeenCalledWith(
          defaultTrackerData, mockHref,
          { context: { product: 'something' }, iosDeepLinkPath: undefined, }
        );
        expect(SmartBannerLayoutFactory.createViewForSdk).toHaveBeenCalled();
        expect(smartBannerViewMock.render).toHaveBeenCalled();
      });
    });
  });

});
