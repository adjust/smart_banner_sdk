import { SmartBannerData, UserTrackerData } from '../data/types';
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
import { SmartBannerView } from '../view/smart-banner-view';
import { SmartBannerViewData } from '../view/types';
import { Globals } from '../globals';
import { DismissHandler } from './dismiss-handler';
import { BannerSelector } from './banners-filter/banner-selector';
import { buildSmartBannerUrl } from './tracker-builder';
import { Callback, SmartBannerOptions } from '../types';
import { isEmptyObject } from '../utils/object-utils';

export class SmartBanner {
  private network: Network;
  private dismissHandler: DismissHandler;
  private bannerProvider: BannerProvider;
  private language: string | null;
  private customTrackerData: UserTrackerData = {};
  private onCreated?: Callback;
  private onDismissed?: Callback;
  private view: SmartBannerView | null = null;
  private url: string = window.location.href;

  constructor(
    appToken: string,
    { dataResidency, language, deeplink, context, onCreated, onDismissed }: SmartBannerOptions,
    private deviceOs: DeviceOS
  ) {
    this.dismissHandler = new DismissHandler();

    const networkConfig: NetworkConfig = {
      dataEndpoint: (Globals._DEV_MODE_ && Globals._DEV_ENDPOINT_) ? Globals._DEV_ENDPOINT_ : undefined,
      dataResidencyRegion: dataResidency
    };

    this.network = NetworkFactory.create(networkConfig);
    const networkApi = new SmartBannerApi(this.deviceOs, this.network);

    this.bannerProvider = new BannerProvider(
      appToken,
      this.url,
      new SmartBannerRepository(networkApi),
      new BannerSelector(this.dismissHandler)
    );

    this.onCreated = onCreated;
    this.onDismissed = onDismissed;

    this.language = language || getLanguage();

    if (deeplink) {
      this.customTrackerData.deeplink = deeplink;
    }

    if (context && !isEmptyObject(context)) {
      this.customTrackerData.context = context;
    }

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
      Logger.log('Smart banner was not created yet, the chosen language will be applied within creation');
      return;
    }

    if (!this.bannerProvider.banner) {
      Logger.log('There is no suitable banner for current page, preserving the choosen language');
      return;
    }

    const { banner, when } = this.bannerProvider.banner;
    this.updateOrScheduleCreation(banner, when);
  }

  setDeeplinkContext({ deeplink, context }: UserTrackerData): void {
    if (!deeplink && (!context || isEmptyObject(context))) {
      // empty deeplink and context passed, clean current value
      deeplink = undefined;
      context = undefined;
    } else {
      if (deeplink === undefined) {
        // only context passed, don't override the previous deeplink
        deeplink = this.customTrackerData.deeplink;
      } else if (!deeplink) {
        // deeplink === '', clean it
        deeplink = undefined;
      }

      if (context === undefined) {
        // only deeplink passed, don't override the previous context
        context = this.customTrackerData.context;
      } else if (isEmptyObject(context)) {
        // context === {}, clean it
        context = undefined;
      }
    }

    this.customTrackerData = { deeplink, context };

    if (this.bannerProvider.isLoading) {
      Logger.log('Smart banner was not created yet, the provided deeplink context will be applied within creation');
      return;
    }

    if (!this.bannerProvider.banner) {
      Logger.log('There is no suitable banner for current page, preserving the provided deeplink context');
      return;
    }

    const { banner, when } = this.bannerProvider.banner;
    this.updateOrScheduleCreation(banner, when);
  }

  private init() {
    this.bannerProvider.fetchBanner()
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
    Logger.info(`Render banner: ${bannerData.name}`);

    const { renderData, trackerUrl } = this.prepareDataForRender(bannerData);

    this.view = new SmartBannerView(renderData, trackerUrl, () => this.dismiss(bannerData));
    this.view.render(document.body);

    Logger.log('Smart banner rendered');

    if (this.onCreated) {
      this.onCreated();
    }
  }

  private updateOrScheduleCreation(banner: SmartBannerData, when: number) {
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

      this.bannerProvider.fetchBanner()
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

    const trackerData = convertSmartBannerToTracker(bannerData, this.network.trackerEndpoint, this.language);
    const trackerUrl = buildSmartBannerUrl(trackerData, this.url, this.customTrackerData);

    return { renderData, trackerUrl };
  }
}
