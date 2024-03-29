import { Logger } from '@utils/logger';
import { SmartBannerData } from '../data/types';
import { Storage, StorageFactory } from '../data/storage/storage-factory';

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

    return Math.max(dismissedDate + banner.dismissal_period * 1000, Date.now());
  }

  public isDismissed(banner: SmartBannerData): boolean {
    return this.getDateToShowAgain(banner) > Date.now();
  }

  public dismiss(banner: SmartBannerData) {
    this.storage.setItem(banner.id, Date.now());
  }

  public schedule(banner: SmartBannerData, showBannerCallback: () => void, when: number) {
    if (this.timer) {
      Logger.log('Clearing previously scheduled creation of a Smart banner');
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(
      () => {
        this.timer = null;
        this.storage.removeItem(banner.id);
        showBannerCallback();
      },
      when - Date.now());

    Logger.info(`Smart banner ${banner.title} creation scheduled on ${new Date(when)}`);
  }

}
