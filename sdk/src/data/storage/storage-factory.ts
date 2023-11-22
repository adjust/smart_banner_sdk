import { Logger } from '@utils/logger';
import { LocalStorage } from './local-storage';
import { InMemoryStorage } from './in-memory-storage';
import { Storage } from './storage';

class StorageFactory {
  private static isLocalStorageSupported(): boolean {
    try {
      const uid = (new Date).toString();
      const storage = window.localStorage;
      storage.setItem(uid, uid);
      const result = storage.getItem(uid) === uid;
      storage.removeItem(uid);
      const support = !!(result && storage);

      return support;

    } catch (e) {
      return false;
    }
  }

  public static createStorage(): Storage {
    if (this.isLocalStorageSupported()) {
      return new LocalStorage();
    }

    Logger.info('Persistant storage is not available, using an in-memory storage instead');
    return new InMemoryStorage();
  }
}

export { Storage, StorageFactory };
