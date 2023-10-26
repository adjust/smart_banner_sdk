import { SmartBannerLayout, SmartBannerViewData, SmartBannerLayoutFactory } from '@layout';
import { SmartBannerData, DeeplinkData } from '../data/types';
import { SmartBannerApi } from '../data/api';
import { BannerProvider } from './banner-provider';
import { SmartBannerRepository } from '../data/repositories/smart-banner-repository';
import { convertSmartBannerToTracker } from '../data/converters/smart-banner-to-tracker-data';
import { convertSmartBannerDataForView } from '../data/converters/smart-banner-for-view';
import { Network } from '../network/network';
import { NetworkConfig, NetworkFactory } from '../network/network-factory';
import { Logger } from '../utils/logger';
import { DeviceOS } from '../utils/detect-os';
import { getLanguage } from '../utils/language';
import { Globals } from '../globals';
import { DismissHandler } from './dismiss-handler';
import { BannerSelector } from './banners-filter/banner-selector';
import { buildSmartBannerUrl } from './tracker-builder';
import { Callback, SmartBannerOptions } from '../types';

export class SmartBanner {
  private network: Network;
  private dismissHandler: DismissHandler;
  private bannerProvider: BannerProvider;
  private language: string | null;
  private customDeeplinkData: DeeplinkData = { context: {} };
  private bannerParent?: HTMLElement;
  private onCreated?: Callback;
  private onDismissed?: Callback;
  private view: SmartBannerLayout | null = null;
  private url: string = window.location.href;

  constructor(appToken: string, options: SmartBannerOptions, private deviceOs: DeviceOS) {

    // TODO: remove in version 1.0.0
    if (Object.prototype.hasOwnProperty.call(options, 'androidAppSchema')) {
      Logger.warn('Property `androidAppSchema` is deprecated and will not be applied');
    }

    let deprecatedDeepLinkPath: string | undefined = undefined;
    if (Object.prototype.hasOwnProperty.call(options, 'deepLinkPath')) {
      Logger.warn('Property `deepLinkPath` is deprecated, please use `iosDeepLinkPath` and `androidDeepLinkPath` instead');

      deprecatedDeepLinkPath = (options as any)['deepLinkPath'];
    }

    const { language, bannerParent, onCreated, onDismissed } = options;
    let { iosDeepLinkPath, androidDeepLinkPath, context } = options;

    this.dismissHandler = new DismissHandler();

    const networkConfig: NetworkConfig = {
      dataEndpoint: (Globals._DEV_MODE_ && Globals._DEV_ENDPOINT_) ? Globals._DEV_ENDPOINT_ : undefined
    };

    this.network = NetworkFactory.create(networkConfig);
    const networkApi = new SmartBannerApi(this.deviceOs, this.network);

    this.bannerProvider = new BannerProvider(
      appToken,
      new SmartBannerRepository(networkApi),
      new BannerSelector(this.dismissHandler)
    );

    this.bannerParent = bannerParent;
    if (Object.prototype.hasOwnProperty.call(options, 'bannerParent') && !this.bannerParent) {
      Logger.warn('Specified banner parent not found, banner will be attached to document.body');
    }

    this.onCreated = onCreated;
    this.onDismissed = onDismissed;

    this.language = language || getLanguage();

    context = context || {};

    // TODO: remove in version 1.0.0
    if (deprecatedDeepLinkPath) {
      if (androidDeepLinkPath === undefined) {
        androidDeepLinkPath = deprecatedDeepLinkPath;
      }

      if (iosDeepLinkPath === undefined) {
        iosDeepLinkPath = deprecatedDeepLinkPath;
      }
    }

    this.customDeeplinkData = { androidDeepLinkPath, iosDeepLinkPath, context };

    this.init();
  }

  show(): void {
    if (this.url === window.location.href) {
      this.changeVisibility('show');
    } else {
      Logger.info('Page address changed');

      this.url = window.location.href;

      if (this.view) {
        this.destroyView();
      }

      this.init();
    }
  }

  hide(): void {
    this.changeVisibility('hide');
  }

  setLanguage(language: string): void {
    this.language = language;

    if (this.bannerProvider.isLoading) {
      Logger.log('Smart banner was not rendered yet, the chosen language will be applied within render');
      return;
    }

    if (!this.bannerProvider.banner) {
      Logger.log('There is no suitable banner for current page, preserving the choosen language');
      return;
    }

    const { banner, when } = this.bannerProvider.banner;
    this.updateViewOrScheduleCreation(banner, when);
  }

  setIosDeepLinkPath(deeplinkPath: string): void {
    this.customDeeplinkData.iosDeepLinkPath = deeplinkPath;

    if (this.bannerProvider.isLoading) {
      Logger.log('Smart banner was not rendered yet, the provided iOS deeplink path will be applied within render');
      return;
    }

    if (!this.bannerProvider.banner) {
      Logger.log('There is no suitable banner for current page, preserving the provided iOS deeplink path');
      return;
    }

    const { banner, when } = this.bannerProvider.banner;
    this.updateViewOrScheduleCreation(banner, when);
  }

  setAndroidDeepLinkPath(deeplinkPath: string): void {
    this.customDeeplinkData.androidDeepLinkPath = deeplinkPath;

    if (this.bannerProvider.isLoading) {
      Logger.log('Smart banner was not rendered yet, the provided Android deeplink path will be applied within render');
      return;
    }

    if (!this.bannerProvider.banner) {
      Logger.log('There is no suitable banner for current page, preserving the provided Android deeplink path');
      return;
    }

    const { banner, when } = this.bannerProvider.banner;
    this.updateViewOrScheduleCreation(banner, when);
  }

  setContext(context: Record<string, string> = {}): void {
    this.customDeeplinkData.context = context;

    if (this.bannerProvider.isLoading) {
      Logger.log('Smart banner was not rendered yet, the provided deeplink context will be applied within render');
      return;
    }

    if (!this.bannerProvider.banner) {
      Logger.log('There is no suitable banner for current page, preserving the provided deeplink context');
      return;
    }

    const { banner, when } = this.bannerProvider.banner;
    this.updateViewOrScheduleCreation(banner, when);
  }

  private init() {
    this.bannerProvider.fetchBanner(this.url)
      .then(() => {
        if (!this.bannerProvider.banner) {
          return;
        }

        const { banner, when } = this.bannerProvider.banner;
        this.createOrSchedule(banner, when);
      });
  }

  private createOrSchedule(banner: SmartBannerData, when: number) {
    if (when <= 0) {
      this.createView(banner);
    } else {
      this.dismissHandler.schedule(banner, () => this.createView(banner), when);
    }
  }

  private createView(bannerData: SmartBannerData) {
    Logger.info(`Render banner: ${bannerData.title}`);

    const { renderData, trackerUrl } = this.prepareDataForRender(bannerData);

    this.view = SmartBannerLayoutFactory.createViewForSdk(renderData, trackerUrl, () => this.dismiss(bannerData));
    this.view.render(this.bannerParent);

    Logger.log('Smart banner rendered');

    if (this.onCreated) {
      this.onCreated();
    }
  }

  private updateViewOrScheduleCreation(banner: SmartBannerData, when: number) {
    if (when <= 0) {
      this.updateView(banner);
    } else {
      this.dismissHandler.schedule(banner, () => this.createView(banner), when);
    }
  }

  private updateView(banner: SmartBannerData) {
    if (this.view) {
      Logger.log('Updating Smart banner');

      const { renderData, trackerUrl } = this.prepareDataForRender(banner);

      this.view.update(renderData, trackerUrl);

      Logger.log('Smart banner updated');
    } else {
      Logger.error('There is no Smart banner to update');
    }
  }

  private destroyView() {
    if (this.view) {
      this.view.destroy();
      this.view = null;
      Logger.log('Smart banner removed');
    } else {
      Logger.error('There is no Smart banner to remove');
    }
  }

  private dismiss(banner: SmartBannerData) {
    this.dismissHandler.dismiss(banner);

    this.destroyView();

    if (this.onDismissed) {
      this.onDismissed();
    }
  }

  private changeVisibility(action: 'show' | 'hide') {
    if (this.view) {
      this.view[action]();
      let message = `${action} banner`;
      message = message.charAt(0).toUpperCase() + message.slice(1);
      Logger.log(message);
      return;
    }

    if (this.bannerProvider.isLoading) {
      Logger.log(`Fetching banners now, ${action} banner after fetch finished`);

      this.bannerProvider.fetchBanner(this.url)
        .then(() => {
          Logger.log(`Banners fetch finished, ${action} Smart banner now`);
          this.changeVisibility(action);
        });

      return;
    }
  }

  /**
   * Returns localized render data and tracker URL
   */
  private prepareDataForRender(bannerData: SmartBannerData): { renderData: SmartBannerViewData, trackerUrl: string } {
    const renderData = convertSmartBannerDataForView(bannerData, this.language);

    const trackerData = convertSmartBannerToTracker(bannerData, this.language);
    const trackerUrl = buildSmartBannerUrl(trackerData, this.url, this.customDeeplinkData);

    return { renderData, trackerUrl };
  }
}
