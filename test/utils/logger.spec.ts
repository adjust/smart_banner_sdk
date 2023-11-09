import { Logger } from '@sdk/utils/logger';

describe('Logger tests', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log');
    jest.spyOn(console, 'warn');
    jest.spyOn(console, 'error');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs a message', () => {
    Logger.setLogLevel('verbose'); // needed to allow messages of all the levels to be printed

    Logger.log('log');
    expect(console.log).toBeCalledWith('log');

    Logger.info('info');
    expect(console.log).toBeCalledWith('info');

    Logger.warn('warn');
    expect(console.warn).toBeCalledWith('warn');

    Logger.error('error');
    expect(console.error).toBeCalledWith('error');
  });

  describe('Log levels', () => {
    it('logs any message when log level is verbose', () => {
      Logger.setLogLevel('verbose');

      Logger.log('log');
      expect(console.log).toBeCalledWith('log');

      Logger.info('info');
      expect(console.log).toBeCalledWith('info');

      Logger.warn('warn');
      expect(console.warn).toBeCalledWith('warn');

      Logger.error('error');
      expect(console.error).toBeCalledWith('error');
    });

    it('logs only info, warning and error messages when log level is info', () => {
      Logger.setLogLevel('info');

      Logger.log('log');
      expect(console.log).not.toBeCalled();

      Logger.info('info');
      expect(console.log).toBeCalledWith('info');

      Logger.warn('warn');
      expect(console.warn).toBeCalledWith('warn');

      Logger.error('error');
      expect(console.error).toBeCalledWith('error');
    });

    it('logs only warning and error messages when log level is warning', () => {
      Logger.setLogLevel('warning');

      Logger.log('log');
      expect(console.log).not.toBeCalled();

      Logger.info('info');
      expect(console.log).not.toBeCalled();

      Logger.warn('warn');
      expect(console.warn).toBeCalledWith('warn');

      Logger.error('error');
      expect(console.error).toBeCalledWith('error');
    });

    it('logs only error messages when log level is error', () => {
      Logger.setLogLevel('error');

      Logger.log('log');
      expect(console.log).not.toBeCalled();

      Logger.info('info');
      expect(console.log).not.toBeCalled();

      Logger.warn('warn');
      expect(console.warn).not.toBeCalled();

      Logger.error('error');
      expect(console.error).toBeCalledWith('error');
    });

    it('logs nothing when log level is none', () => {
      Logger.setLogLevel('none');

      Logger.log('log');
      expect(console.log).not.toBeCalled();

      Logger.info('info');
      expect(console.log).not.toBeCalled();

      Logger.warn('warn');
      expect(console.warn).not.toBeCalled();

      Logger.error('error');
      expect(console.error).not.toBeCalled();
    });
  });

});
