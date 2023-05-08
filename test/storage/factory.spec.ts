import { InMemoryStorage } from '../../src/storage/in-memory-storage';
import { LocalStorage } from '../../src/storage/local-storage';
import { StorageFactory } from '../../src/storage/storage-factory';

jest.mock('../../src/storage/local-storage');
jest.mock('../../src/storage/in-memory-storage');

describe('StorageFactory', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates LocalStorage by default', () => {
    StorageFactory.createStorage();

    expect(LocalStorage).toHaveBeenCalledTimes(1);
    expect(InMemoryStorage).not.toHaveBeenCalled();
  });

  it('creates InMemoryStorage if LocalStorage not supported', () => {
    jest.spyOn(window, 'localStorage', 'get').mockImplementationOnce(() => {
      throw new Error('EmulatedSecurityError');
    });

    StorageFactory.createStorage();

    expect(InMemoryStorage).toHaveBeenCalledTimes(1);
    expect(LocalStorage).not.toHaveBeenCalled();
  });
});
