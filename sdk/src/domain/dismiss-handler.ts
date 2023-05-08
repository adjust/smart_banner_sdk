import { SmartBannerData } from '../data/api';
import { Storage, StorageFactory } from '../data/storage/storage-factory';
import { Logger } from '../utils/logger';

export class DismissHandler {
  private storage: Storage;
  private timer: NodeJS.Timeout | null = null;

  constructor(storage?: Storage) {
    this.storage = storage ?? StorageFactory.createStorage();
  }

  public getDateToShowAgain(banner: SmartBannerData): number {
    const dismissedDate = this.storage.getItem(banner.id);

    if (!dismissedDate || typeof dismissedDate !== 'number') {
      return Date.now();
    }

    return dismissedDate + banner.dismissalPeriod;
  }

  public isDismissed(banner: SmartBannerData): boolean {
    return this.getDateToShowAgain(banner) > Date.now();
  }

  public dismiss(banner: SmartBannerData) {
    this.storage.setItem(banner.id, Date.now());
  }

  /**
   * Schedules a creation of banner
   */
  public schedule(banner: SmartBannerData, showBannerCallback: () => void) {
    if (this.timer) {
      Logger.log('Clearing previously scheduled creation of Smart Banner');
      clearTimeout(this.timer);
      this.timer = null;
    }

    const when = this.getDateToShowAgain(banner);

    const delay = when - Date.now();
    this.timer = setTimeout(
      () => {
        this.timer = null;
        this.storage.removeItem(banner.id);
        showBannerCallback();
      },
      delay);

    Logger.log(`Smart Banner creation scheduled on ${new Date(when)}`);
  }

}
