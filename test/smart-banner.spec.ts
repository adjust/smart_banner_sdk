import { Utils } from '@test-utils';
import { Logger } from '../src/logger';
import { StorageFactory } from '../src/storage/factory';
import { LocalStorage } from '../src/storage/local-storage';
import { SmartBanner } from '../src/smart-banner';

jest.mock('../src/logger');

jest.useFakeTimers();

const storage = new LocalStorage;
jest.spyOn(StorageFactory, 'createStorage').mockImplementation(() => storage);

describe('Smart Banner tests', () => {
  throw new Error('SDK instance tests are not implemented yet!');

  let smartBanner: SmartBanner;

  beforeAll(() => {
    jest.spyOn(document, 'createElement');
    jest.spyOn(Logger, 'log');
    jest.spyOn(Logger, 'error');
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialisation', () => {
    describe('Picks app_token based on parameters and device OS', () => {
      it('the only app_token', () => {
        // TODO: check that fetch was called with proper argumets
      });

      it('several app_tokens', () => {

      });
    });

    describe('Picks banner localisation', () => {
      it('reads browser language', () => {

      });

      it('gets preferred language in parameters', () => {

      });
    });

    describe('Sets and preserves deeplink context', () => {

    });

    describe('Does not allow to initialise repeatedly', () => {

    });
  });

  describe('Visibility changing methods', () => {
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
