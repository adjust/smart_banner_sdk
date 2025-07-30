import { Logger } from '@sdk/utils/logger';

describe('Logger tests', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('logs a message', () => {
    Logger.setLogLevel('verbose'); // needed to allow messages of all the levels to be printed

    Logger.log('log');
    expect(console.log).toHaveBeenCalledWith('log');

    Logger.info('info');
    expect(console.log).toHaveBeenCalledWith('info');

    Logger.warn('warn');
    expect(console.warn).toHaveBeenCalledWith('warn');

    Logger.error('error');
    expect(console.error).toHaveBeenCalledWith('error');
  });

  describe('Log levels', () => {
    it('logs any message when log level is verbose', () => {
      Logger.setLogLevel('verbose');

      Logger.log('log');
      expect(console.log).toHaveBeenCalledWith('log');

      Logger.info('info');
      expect(console.log).toHaveBeenCalledWith('info');

      Logger.warn('warn');
      expect(console.warn).toHaveBeenCalledWith('warn');

      Logger.error('error');
      expect(console.error).toHaveBeenCalledWith('error');
    });

    it('logs only info, warning and error messages when log level is info', () => {
      Logger.setLogLevel('info');

      Logger.log('log');
      expect(console.log).not.toHaveBeenCalled();

      Logger.info('info');
      expect(console.log).toHaveBeenCalledWith('info');

      Logger.warn('warn');
      expect(console.warn).toHaveBeenCalledWith('warn');

      Logger.error('error');
      expect(console.error).toHaveBeenCalledWith('error');
    });

    it('logs only warning and error messages when log level is warning', () => {
      Logger.setLogLevel('warning');

      Logger.log('log');
      expect(console.log).not.toHaveBeenCalled();

      Logger.info('info');
      expect(console.log).not.toHaveBeenCalled();

      Logger.warn('warn');
      expect(console.warn).toHaveBeenCalledWith('warn');

      Logger.error('error');
      expect(console.error).toHaveBeenCalledWith('error');
    });

    it('logs only error messages when log level is error', () => {
      Logger.setLogLevel('error');

      Logger.log('log');
      expect(console.log).not.toHaveBeenCalled();

      Logger.info('info');
      expect(console.log).not.toHaveBeenCalled();

      Logger.warn('warn');
      expect(console.warn).not.toHaveBeenCalled();

      Logger.error('error');
      expect(console.error).toHaveBeenCalledWith('error');
    });

    it('logs nothing when log level is none', () => {
      Logger.setLogLevel('none');

      Logger.log('log');
      expect(console.log).not.toHaveBeenCalled();

      Logger.info('info');
      expect(console.log).not.toHaveBeenCalled();

      Logger.warn('warn');
      expect(console.warn).not.toHaveBeenCalled();

      Logger.error('error');
      expect(console.error).not.toHaveBeenCalled();
    });
  });

});
