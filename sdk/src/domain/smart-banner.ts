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

export class SmartBanner {
  private network: Network;
  private repository: SmartBannerRepository;
  private dismissHandler: DismissHandler;
  private bannersSelector: BannerSelector;
  private language: string | null;
  private customTrackerData: UserTrackerData = {};
  private onCreated?: Callback;
  private onDismissed?: Callback;
  private dataFetchPromise: Promise<SmartBannerData[] | null> | null = null;
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
      dataEndpoint: Globals._DEV_MODE_ && Globals._DEV_ENDPOINT_ ? Globals._DEV_ENDPOINT_ : undefined,
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
    this.dataFetchPromise = this.repository.fetch(this.appToken);

    return this.dataFetchPromise.then(bannersList => {
      this.dataFetchPromise = null;

      if (!bannersList) {
        Logger.log(`No Smart Banners for ${this.deviceOs} platform found`);
        return null;
      }

      const matchingBanner = this.bannersSelector.next(bannersList, this.url);

      if (!matchingBanner) {
        Logger.log(`No Smart Banners for ${this.url} page found`);
        return null;
      }

      return matchingBanner;
    });
  }

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

  private updateView(view: SmartBannerView) {
    return this.getMatchingBanner()
      .then((matchingBanner) => {
        if (!matchingBanner) {
          return;
        }

        const { banner, schedule } = matchingBanner;

        if (schedule > 0) {
          Logger.log('Smart banner was not created yet, the chosen language will be applied in creation');
          return;
        }

        const { renderData, trackerUrl } = this.prepareDataForRender(banner);

        Logger.log('Updating Smart banner');
        view.update(renderData, trackerUrl);
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

    if (this.dataFetchPromise) {
      Logger.log(`Fetching banners now, ${action} banner after fetch finished`);

      this.dataFetchPromise
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


    if (!this.view) {
      Logger.log('Smart banner was not created yet, the chosen language will be applied in creation');
      return;
    }

    this.updateView(this.view);
  }

  setDeeplinkContext({ deeplink, context }: UserTrackerData): void {
    this.customTrackerData = { deeplink, context };

    if (!this.view) {
      Logger.log('Smart banner was not created yet, the chosen context will be applied in creation');
      return;
    }

    this.updateView(this.view);
  }
}
