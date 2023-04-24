import { Logger } from '@sdk/utils/logger';
import { SmartBanner } from '@sdk/domain/smart-banner';
import { LocalStorage } from '@sdk/data/storage/local-storage';
import { StorageFactory } from '@sdk/data/storage/storage-factory';

jest.mock('@sdk/utils/logger');

jest.useFakeTimers();

const storage = new LocalStorage;
jest.spyOn(StorageFactory, 'createStorage').mockImplementation(() => storage);

describe('Smart Banner tests', () => {
  describe('Initialisation', () => {
    describe('Picks app_token based on parameters and device OS', () => {
      it('the only app_token', () => {

      });

      it('several app_tokens', () => {

      });
    });

    describe('Accepts banner localisation', () => {
      it('accepts preferred language in parameters and uses it in view', () => {

      });
    });

    describe('Sets and preserves deeplink and context', () => {

    });

    describe('Does not allow to initialise repeatedly', () => {

    });
  });

  describe('Change visibility', () => {
    describe('Called before initialisation', () => {
      it('attempt to call hide() logs an error message', () => {

      });

      it('attempt to call show() logs an error message', () => {

      });
    });

    describe('Called when initialisation was not finished yet', () => {

    });

    describe('Called when initialisation finished', () => {

    });
  });

  describe('Deeplink context setting', () => {

  });

  describe('Language setting', () => {

  });

});
