
import { AsyncDataSource } from '../data-source';
import { InMemoryStorage } from '../../storage/in-memory-storage';
import { Repository } from './repository';
import { SmartBannerData } from '../api';
import { Storage } from '../../storage/storage';

/**
 * Fetches SmartBanner data using SmartBannerApi and caches it.
 */
export class SmartBannerRepository implements Repository<string, SmartBannerData[]> {
  constructor(
    private networkDataSource: AsyncDataSource<string, SmartBannerData[]>,
    private cache: Storage = new InMemoryStorage()
  ) { }

  public fetch(token: string): Promise<SmartBannerData[] | null> {
    const cachedBanners = this.cache.getItem<SmartBannerData[]>(token);
    if (cachedBanners) {
      return Promise.resolve(cachedBanners);
    }

    return this.networkDataSource.retrieve(token)
      .then(banners => {
        if (banners) {
          this.cache.setItem(token, banners);
        }

        return banners;
      });
  }
}
