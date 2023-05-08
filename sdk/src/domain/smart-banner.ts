import { SmartBannerData } from '../data/types';
import { SmartBannerApi } from '../data/api';
import { SmartBannerRepository } from '../data/repositories/smart-banner-repository';
import { convertDataToViewData } from '../data/converters/view-data-converter';
import { Logger } from '../utils/logger';
import { Network } from '../network/network';
import { NetworkFactory } from '../network/network-factory';
import { DataResidency } from '../network/url-strategy/data-residency';
import { DeviceOS } from '../utils/detect-os';
import { getLanguage } from '../utils/language';
import { SmartBannerView } from '../view/smart-banner-view';
import { Globals } from '../globals';
import { UrlStrategyConfig } from '../network/url-strategy/url-strategy-factory';
import { DismissHandler } from './dismiss-handler';
import { BannerSelector } from './banners-filter/banner-selector';

type Callback = () => any;

export type AppToken = { [k in DeviceOS]?: string } | string;

export interface SmartBannerOptions {
  appToken: AppToken;
  dataResidency?: DataResidency.Region;
  language?: string;
  onCreated?: Callback;
  onDismissed?: Callback;
}

export class SmartBanner {
  private network: Network;
  private repository: SmartBannerRepository;
  private dismissHandler: DismissHandler;
  private bannersSelector: BannerSelector;
  private language: string;
  private onCreated?: Callback;
  private onDismissed?: Callback;
  private dataFetchPromise: Promise<SmartBannerData[] | null> | null = null;
  private view: SmartBannerView | null = null;

  constructor(
    appToken: string,
    { dataResidency, language, onCreated, onDismissed }: SmartBannerOptions,
    private deviceOs: DeviceOS,
    network?: Network
  ) {
    this.dismissHandler = new DismissHandler();
    this.bannersSelector = new BannerSelector(this.dismissHandler);

    this.onCreated = onCreated;
    this.onDismissed = onDismissed;

    let urlStrategyConfig: UrlStrategyConfig = {};
    if (dataResidency) {
      urlStrategyConfig = { dataResidency };
    } else if (Globals._DEV_MODE_ && Globals._DEV_ENDPOINT_) {
      // remove from production code
      urlStrategyConfig = { customUrl: Globals._DEV_ENDPOINT_ };
    }

    this.network = network || NetworkFactory.create({ urlStrategyParameters: { urlStrategyConfig } });

    const networkApi = new SmartBannerApi(this.deviceOs, this.network);
    this.repository = new SmartBannerRepository(networkApi);

    this.language = language || getLanguage();

    this.init(appToken);
  }

  private isInitialised(): boolean {
    if (this.view) {
      Logger.error('Smart Banner is created already');
      return true;
    }

    if (this.dataFetchPromise) {
      Logger.error('Smart Banner is initialising already');
      return true;
    }

    return false;
  }

  private createBanner(bannerData: SmartBannerData) {
    Logger.log('Creating Smart Banner');

    this.view = new SmartBannerView(
      document.body,
      convertDataToViewData(bannerData, this.language),
      '',
      () => this.dismiss(bannerData)
    );
    this.view.render();

    Logger.log('Smart Banner created');

    if (this.onCreated) {
      this.onCreated();
    }
  }

  private init(appToken: string) {
    if (this.isInitialised()) {
      return;
    }

    Logger.log('Fetching Smart banners');

    this.dataFetchPromise = this.repository.fetch(appToken);

    this.dataFetchPromise.then(bannersList => {
      this.dataFetchPromise = null;

      if (!bannersList) {
        Logger.log(`No Smart Banners for ${this.deviceOs} platform found`);
        return;
      }

      const matchingBanner = this.bannersSelector.next(bannersList, window.location.href);

      if (!matchingBanner) {
        Logger.log(`No Smart Banners for ${window.location.href} page found`);
        return;
      }

      const { banner, schedule } = matchingBanner;
      if (schedule <= 0) {
        this.createBanner(banner);
      } else {
        this.dismissHandler.schedule(banner, () => this.createBanner(banner), schedule);
      }
    });
  }

  private dismiss(banner: SmartBannerData) {
    this.dismissHandler.dismiss(banner);

    this.destroy();

    if (this.onDismissed) {
      this.onDismissed();
    }
  }

  /**
   * Removes Smart Banner from DOM
   */
  private destroy() {
    if (this.view) {
      this.view.destroy();
      this.view = null;
      Logger.log('Smart Banner removed');
    } else {
      Logger.error('There is no Smart Banner to remove');
    }
  }

  // TODO: should check if page url changed and select another banner if needed, not just change visibility
  show(): void {
    if (this.view) {
      this.view.show();
      return;
    }

    if (this.dataFetchPromise) {
      Logger.log('Smart Banner will be shown after initialisation finished');

      this.dataFetchPromise
        .then(() => {
          Logger.log('Initialisation finished, show Smart Banner now');
          this.show();
        });

      return;
    }

    Logger.error('There is no Smart Banner to show, have you called initialisation?');
  }

  hide(): void {
    if (this.view) {
      this.view.hide();
      return;
    }

    if (this.dataFetchPromise) {
      Logger.log('Smart Banner will be hidden after initialisation finished');

      this.dataFetchPromise
        .then(() => {
          Logger.log('Initialisation finished, hide Smart Banner now');
          this.hide();
        });

      return;
    }

    Logger.error('There is no Smart Banner to hide, have you called initialisation?');
  }

  setLanguage(language: string): void {
    this.language = language;
    // TODO: change language in view
  }

  setContext(context: Record<string, string>): void {

  }
}
