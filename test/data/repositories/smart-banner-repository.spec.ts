import { SmartBannerData } from '../../../src/data/api';
import { AsyncDataSource } from '../../../src/data/data-source';
import { SmartBannerRepository } from '../../../src/data/repositories/smart-banner-repository';
import { InMemoryStorage } from '../../../src/storage/in-memory-storage';
import { Storage } from '../../../src/storage/storage';

describe('SmartBannerRepository', () => {

  const data = ['data-1', 'data-2'];

  const testApiRetrieveSpy = jest.fn().mockImplementation(() => {
    return Promise.resolve(data);
  })

  const testApi: AsyncDataSource<string, SmartBannerData[]> = {
    retrieve: testApiRetrieveSpy
  }

  const testCache: Storage = new InMemoryStorage()

  let repository: SmartBannerRepository

  beforeAll(() => {
    jest.spyOn(testCache, 'setItem')
    jest.spyOn(testCache, 'getItem')
  })

  beforeEach(() => {
    repository = new SmartBannerRepository(testApi, testCache)
  })

  afterEach(() => {
    testCache.removeItem('app-token-1');
    jest.clearAllMocks();
  })

  it('fetches data from server and caches the data', async () => {
    expect.assertions(3)

    const fetchedData = await repository.fetch('app-token-1')

    expect(fetchedData).toStrictEqual(data)
    expect(testApi.retrieve).toBeCalled()
    expect(testCache.setItem).toBeCalledWith('app-token-1', data)
  })

  it('returns data from cache', async () => {
    expect.assertions(5)

    const fetchedData = await repository.fetch('app-token-1')
    expect(testApi.retrieve).toBeCalledTimes(1)
    expect(testCache.getItem).toBeCalledTimes(1) // one call for an attempt to get from the cache when the cache is still empty

    const cachedData = await repository.fetch('app-token-1')

    expect(cachedData).toStrictEqual(fetchedData)
    expect(testApi.retrieve).toBeCalledTimes(1)
    expect(testCache.getItem).toBeCalledTimes(2)
  })

  it('retrieves data from network when there is no record in the cache', async () => {
    expect.assertions(4)

    await repository.fetch('app-token-1')

    testApiRetrieveSpy.mockImplementation(() => {
      return Promise.resolve(['new-data']);
    })

    const dataForNewToken = await repository.fetch('new-token')

    expect(dataForNewToken).toStrictEqual(['new-data']);
    expect(testCache.getItem).toBeCalledTimes(2)
    expect(testCache.getItem).toHaveBeenNthCalledWith(2, 'new-token');
    expect(testApi.retrieve).toBeCalledTimes(2)
  })
}) 
