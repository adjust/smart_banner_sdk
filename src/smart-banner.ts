import { Logger } from './logger';
import { getDeviceOS } from './utils/detect-os';
import { Storage, StorageFactory } from './storage/factory';
import { fetchSmartBannerData, SmartBannerData } from './api';
import { SmartBannerView } from './view/smart-banner-view';
import { Network } from './network/network';
import { DataResidency } from './network/url-strategy/data-residency';
import { NetworkFactory } from './network/network-factory';

type Callback = () => any;

export interface SmartBannerOptions {
  webToken: string;
  dataResidency?: DataResidency.Region;
  onCreated?: Callback;
  onDismissed?: Callback;
}

export class SmartBanner {
  private readonly STORAGE_KEY_DISMISSED = 'closed';
  private network: Network;
  private storage: Storage;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private dataFetchPromise: Promise<SmartBannerData | null> | null = null;
  private view: SmartBannerView | null = null;
  private onCreated?: Callback;
  private onDismissed?: Callback;

  constructor({ webToken, dataResidency, onCreated, onDismissed }: SmartBannerOptions, network?: Network) {
    this.onCreated = onCreated;
    this.onDismissed = onDismissed;

    const urlStrategyConfig = dataResidency ? { dataResidency } : {};
    this.network = network || NetworkFactory.create({urlStrategyParameters: {urlStrategyConfig}});

    this.storage = StorageFactory.createStorage();

    this.init(webToken);
  }

  /**
   * Initiate Smart Banner
   *
   * @param webToken token used to get data from backend
   */
  private init(webToken: string) {
    if (this.view) {
      Logger.error('Smart Banner is created already');
      return;
    }

    if (this.dataFetchPromise) {
      Logger.error('Smart Banner is initialising already');
      return;
    }

    const deviceOs = getDeviceOS();
    if (!deviceOs) {
      Logger.log('This platform is not one of the targeting ones, Smart Banner will not be shown');
      return;
    }

    this.dataFetchPromise = fetchSmartBannerData(webToken, deviceOs, this.network);

    this.dataFetchPromise.then(bannerData => {
      this.dataFetchPromise = null;

      if (!bannerData) {
        Logger.log(`No Smart Banners for ${deviceOs} platform found`);
        return;
      }

      const whenToShow = this.getDateToShowAgain(bannerData.dismissInterval);
      if (Date.now() < whenToShow) {
        Logger.log('Smart Banner was dismissed');
        this.scheduleCreation(webToken, whenToShow);
        return;
      }

      Logger.log('Creating Smart Banner');

      this.view = new SmartBannerView(
        bannerData,
        () => this.dismiss(webToken, bannerData.dismissInterval),
        this.network.endpoint
      );

      Logger.log('Smart Banner created');

      if (this.onCreated) {
        this.onCreated();
      }
    });
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

  /**
   * Schedules next Smart Banner show and removes banner from DOM
   */
  private dismiss(webToken: string, dismissInterval: number) {
    Logger.log('Smart Banner dismissed');

    this.storage.setItem(this.STORAGE_KEY_DISMISSED, Date.now());
    const whenToShow = this.getDateToShowAgain(dismissInterval);
    this.scheduleCreation(webToken, whenToShow);

    this.destroy();

    if (this.onDismissed) {
      this.onDismissed();
    }
  }

  /**
   * Sets a timeout to schedule next Smart Banner show
   */
  private scheduleCreation(webToken: string, when: number) {
    if (this.timer) {
      Logger.log('Clearing previously scheduled creation of Smart Banner');
      clearTimeout(this.timer);
      this.timer = null;
    }

    const delay = when - Date.now();
    this.timer = setTimeout(
      () => {
        this.timer = null;
        this.init(webToken);
      },
      delay);

    Logger.log('Smart Banner creation scheduled on ' + new Date(when));
  }

  /**
   * Returns date when Smart Banner should be shown again
   */
  private getDateToShowAgain(dismissInterval: number): number {
    const dismissedDate = this.storage.getItem(this.STORAGE_KEY_DISMISSED);

    if (!dismissedDate || typeof dismissedDate !== 'number') {
      return Date.now();
    }

    return dismissedDate + dismissInterval;
  }

  /**
   * Shows or hides Smart Banner view
   */
  private changeVisibility(action: 'show' | 'hide') {
    if (this.view) {
      this.view[action]();
      return;
    }

    if (this.dataFetchPromise) {
      Logger.log(`Smart Banner will be ${action === 'show' ? 'shown' : 'hidden'} after initialisation finished`);

      this.dataFetchPromise
        .then(() => {
          Logger.log(`Initialisation finished, ${action} Smart Banner now`);
          this[action]();
        });

      return;
    }

    Logger.error(`There is no Smart Banner to ${action}, have you called initialisation?`);
  }

  show(): void {
    this.changeVisibility('show');
  }

  hide(): void {
    this.changeVisibility('hide');
  }
}
