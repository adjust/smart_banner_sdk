import { Repository } from './repository';
import { SmartBannerData } from '../types';
import { AsyncDataSource } from '../data-source';
import { InMemoryStorage } from '../storage/in-memory-storage';
import { Storage } from '../storage/storage';

/**
 * Fetches smart banners using SmartBannerApi and caches them
 */
export class SmartBannerRepository implements Repository<string, SmartBannerData[]> {
  constructor(
    private networkDataSource: AsyncDataSource<string, SmartBannerData[]>,
    private cache: Storage = new InMemoryStorage()
  ) { }

  /**
   * Returns cached smart banners if exists, loads data using networkDataSource otherwise
   * @param token app token to retrieve data from networkDataSource, used as key for cached data
   */
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
