import { SmartBannerData, UserTrackerData } from '../data/types';
import { SmartBannerApi } from '../data/api';
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
  private repository: SmartBannerRepository;
  private dismissHandler: DismissHandler;
  private bannersSelector: BannerSelector;
  private language: string | null;
  private customTrackerData: UserTrackerData = {};
  private onCreated?: Callback;
  private onDismissed?: Callback;
  private gettingBannerPromise: Promise<{ banner: SmartBannerData, schedule: number } | null> | null = null;
  private view: SmartBannerView | null = null;
  private url: string = window.location.href;

  constructor(
    private appToken: string,
    { dataResidency, language, deeplink, context, onCreated, onDismissed }: SmartBannerOptions,
    private deviceOs: DeviceOS
  ) {
    this.dismissHandler = new DismissHandler();
    this.bannersSelector = new BannerSelector(this.dismissHandler);

    this.onCreated = onCreated;
    this.onDismissed = onDismissed;

    const networkConfig: NetworkConfig = {
      dataEndpoint: (Globals._DEV_MODE_ && Globals._DEV_ENDPOINT_) ? Globals._DEV_ENDPOINT_ : undefined,
      dataResidencyRegion: dataResidency
    };

    this.network = NetworkFactory.create(networkConfig);

    const networkApi = new SmartBannerApi(this.deviceOs, this.network);
    this.repository = new SmartBannerRepository(networkApi);

    this.language = language || getLanguage();

    if (deeplink) {
      this.customTrackerData.deeplink = deeplink;
    }

    if (context) {
      this.customTrackerData.context = context;
    }

    this.init();
  }

  private init() {
    this.getMatchingBanner()
      .then(matchingBanner => {
        if (!matchingBanner) {
          return;
        }

        const { banner, schedule } = matchingBanner;
        if (schedule <= 0) {
          this.createView(banner);
        } else {
          this.dismissHandler.schedule(banner, () => this.createView(banner), schedule);
        }
      });
  }

  private getMatchingBanner(): Promise<{ banner: SmartBannerData, schedule: number } | null> {
    this.gettingBannerPromise = this.repository.fetch(this.appToken)
      .then(bannersList => {
        if (!bannersList) {
          Logger.log(`No Smart Banners for ${this.deviceOs} platform found`);
          return null;
        }

        const matchingBanner = this.bannersSelector.next(bannersList, this.url);

        this.gettingBannerPromise = null;

        if (!matchingBanner) {
          Logger.log(`No Smart Banners for ${this.url} page found`);
          return null;
        }

        return matchingBanner;
      });

    return this.gettingBannerPromise;
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

  private updateView() {
    return this.getMatchingBanner()
      .then((matchingBanner) => {
        if (!matchingBanner) {
          return;
        }

        const { banner, schedule } = matchingBanner;

        if (schedule > 0) {
          // rescheduling banner creation with updated data
          this.dismissHandler.schedule(banner, () => this.createView(banner), schedule);
          return;
        }

        if (this.view) {
          const { renderData, trackerUrl } = this.prepareDataForRender(banner);
          Logger.log('Updating Smart banner');
          this.view.update(renderData, trackerUrl);
        } else {
          // TODO ? Is it possible? Should it be handled somehow?
        }
      });
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

  private changeVisibility(action: 'show' | 'hide') {
    if (this.view) {
      this.view[action]();
      let message = `${action} banner`;
      message = message.charAt(0).toUpperCase() + message.slice(1);
      Logger.log(message);
      return;
    }

    if (this.gettingBannerPromise) {
      Logger.log(`Fetching banners now, ${action} banner after fetch finished`);

      this.gettingBannerPromise
        .then(() => {
          Logger.log(`Banners fetch finished, ${action} Smart banner now`);
          this.changeVisibility(action);
        });

      return;
    }
  }

  private dismiss(banner: SmartBannerData) {
    this.dismissHandler.dismiss(banner);

    this.destroyView();

    if (this.onDismissed) {
      this.onDismissed();
    }
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

    if (this.gettingBannerPromise) {
      Logger.log('Smart banner was not created yet, the chosen language will be applied within creation');
      return;
    }

    this.updateView();
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

    if (this.gettingBannerPromise) {
      Logger.log('Smart banner was not created yet, the defined deeplink context will be applied within creation');
      return;
    }

    this.updateView();
  }
}
