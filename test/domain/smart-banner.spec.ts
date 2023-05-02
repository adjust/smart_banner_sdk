import { Logger } from '@sdk/utils/logger';
import { SmartBanner } from '@sdk/domain/smart-banner';
import { DataResidencyRegion, DeviceOS } from '@sdk/main';
import { NetworkConfig, NetworkFactory } from '@sdk/network/network-factory';
import * as DataToViewConverter from '@sdk/data/converters/smart-banner-for-view';
import * as DataToTrackerConverter from '@sdk/data/converters/smart-banner-to-tracker-data';
import * as TrackerBuilder from '@sdk/domain/tracker-builder';
import * as LanguageModule from '@sdk/utils/language';
import * as View from '@sdk/view/smart-banner-view';

import serverResponseMock from '../../fake-data/smart_banners_mock.json';

jest.mock('@sdk/utils/logger');

describe('Smart Banner tests', () => {
  const mockHref = 'http://mock/path';

  const regions = ['EU', 'TR', 'US'] as DataResidencyRegion[];

  const defaultPlatform = DeviceOS.Android;

  const defaultDomain = 'app.test';

  const drDomain = (dr?: DataResidencyRegion) => dr ? `${dr}.test` : defaultDomain;

  const requestMock = jest.fn().mockResolvedValue(serverResponseMock);
  const networkMock = (dr?: DataResidencyRegion) => ({
    trackerEndpoint: drDomain(dr),
    request: requestMock
  });

  const smartBannerViewMock = {
    render: jest.fn(),
    destroy: jest.fn(),
    show: jest.fn(),
    hide: jest.fn()
  } as any as View.SmartBannerView;

  const defaultLocale = serverResponseMock[0].default_language;
  const getLocalization = (locale?: string | null) => {
    const localisations = serverResponseMock[0].localizations as any;
    return locale && localisations[locale] || {};
  };

  const trackerTemplate = '{domain}/tracker-template/{adgroup}';
  const tracker = (domain: string, adgroup: string) => `${domain}/tracker-template/${adgroup}`;

  const renderDataMock = (locale?: string | null) => ({
    buttonLabel: getLocalization(locale).button_label || serverResponseMock[0].button_label
  } as any); // return the only field because this is just a mock

  const trackerDataMock = (domain?: string | null, locale?: string | null) => ({
    template: trackerTemplate,
    context: {
      adgroup: getLocalization(locale).context?.adgroup || defaultLocale,
      domain: domain || defaultDomain
    }
  });

  describe('Initialisation and creation', () => {
    beforeAll(() => {
      const originalLocation = window.location;
      jest.spyOn(window, 'location', 'get').mockImplementation(() => ({
        ...originalLocation,
        href: mockHref,
      }));

      jest.spyOn(NetworkFactory, 'create').mockImplementation(({ dataResidencyRegion }: NetworkConfig = {}) => networkMock(dataResidencyRegion));
      jest.spyOn(DataToViewConverter, 'convertSmartBannerDataForView').mockImplementation((_, locale) => renderDataMock(locale));
      jest.spyOn(DataToTrackerConverter, 'convertSmartBannerToTracker').mockImplementation((_, domain, locale) => trackerDataMock(domain, locale));
      jest.spyOn(TrackerBuilder, 'buildSmartBannerUrl');
      jest.spyOn(View, 'SmartBannerView').mockReturnValue(smartBannerViewMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    describe('Network creation', () => {
      beforeEach(() => {
        requestMock.mockResolvedValueOnce('all good'); // avoiding view creation and other things happen
      });

      it.each(regions)('creates network with NetworkFactory using passed DataResidency region %s', dr => {
        new SmartBanner('some-token', { appToken: 'some-token', dataResidency: dr }, defaultPlatform);

        expect(NetworkFactory.create).toBeCalledWith({ dataResidencyRegion: dr });
      });
    });

    describe('DataResidency', () => {
      it.each(regions)('uses proper trackerEndpoint when DataResidencyRegion defined', async (dr) => {
        new SmartBanner('some-token', { appToken: 'some-token', dataResidency: dr }, defaultPlatform);

        expect.assertions(7);

        await Utils.flushPromises(); // wait for initialisation finished

        expect(NetworkFactory.create).toBeCalledWith({ dataResidencyRegion: dr });
        expect(Logger.log).toBeCalledWith('Fetching Smart banners');
        expect(Logger.log).toBeCalledWith('Smart banners fetched');
        expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
        expect(View.SmartBannerView).toBeCalledWith(expect.anything(), tracker(drDomain(dr), defaultLocale), expect.any(Function));
        expect(smartBannerViewMock.render).toBeCalled();
        expect(Logger.log).toBeCalledWith('Smart banner rendered');
      });
    });

    describe('Localisation', () => {
      describe('Detection', () => {
        it('detects preferred language and uses it in view and for deeplink', async () => {
          jest.spyOn(LanguageModule, 'getLanguage').mockReturnValue('ru');

          new SmartBanner('some-token', { appToken: 'some-token' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock('ru'), tracker(defaultDomain, 'ru'), expect.any(Function));
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
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLocale), tracker(defaultDomain, defaultLocale), expect.any(Function));
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
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLocale), tracker(defaultDomain, defaultLocale), expect.any(Function));
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
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock('ru'), tracker(defaultDomain, 'ru'), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when no preferred localisation in server response', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: 'fr' }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLocale), tracker(defaultDomain, defaultLocale), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });

        it('uses default language when preferred language is the same as default', async () => {
          new SmartBanner('some-token', { appToken: 'some-token', language: defaultLocale }, defaultPlatform);

          expect.assertions(5);

          await Utils.flushPromises(); // wait for initialisation finished

          expect(LanguageModule.getLanguage).not.toBeCalled();
          expect(Logger.info).toBeCalledWith('Render banner: ' + serverResponseMock[0].name);
          expect(View.SmartBannerView).toBeCalledWith(renderDataMock(defaultLocale), tracker(defaultDomain, defaultLocale), expect.any(Function));
          expect(smartBannerViewMock.render).toBeCalled();
          expect(Logger.log).toBeCalledWith('Smart banner rendered');
        });
      });
    });

    describe('Custom deeplink context', () => {
      it('accepts and preserves custom deeplink context', () => {

      });

      it('creates view considering custom deeplink context', () => {

      });

      it('', () => {

      });
    });

    describe('Callbacks', () => {
      describe('onCreated', () => {
        it('is being called after banner renderred', () => {

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
    });
  });

  describe('Change visibility', () => {
    describe('Hide', () => {
      it('hides view', () => {

      });

      it('logs a message when view was not created yet and calls itself after view is created', () => {

      });
    });

    describe('Show', () => {
      it('rereads current URL, updates and shows view', () => {

      });

      it('logs a message when view was not created yet and calls itself after view is created', () => {

      });
    });

  });

  /*describe('Deeplink context setting', () => {

  });

  describe('Language setting', () => {

  });*/

});
