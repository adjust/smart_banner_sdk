export type LogLevel = 'none' | 'verbose' | 'info' | 'warning' | 'error'

export class Logger {
  private static LEVELS: Record<LogLevel, number> = {
    'none': -1,
    'verbose': 1,
    'info': 2,
    'warning': 3,
    'error': 4
  };

  private static level: number = Logger.LEVELS.error;

  private static print(messageLevel: LogLevel, message?: any) {
    if (Logger.LEVELS[messageLevel] < Logger.level) {
      return;
    }

    switch (messageLevel) {
    case 'verbose':
      console.log(message);
      break;
    case 'info':
      console.log(message);
      break;
    case 'warning':
      console.warn(message);
      break;
    case 'error':
      console.error(message);
      break;
    }
  }

  static setLogLevel(level: LogLevel) {
    Logger.level = Logger.LEVELS[level];
  }

  static log(message?: any) {
    Logger.print('verbose', message);
  }

  static info(message?: any) {
    Logger.print('info', message);
  }

  static warn(message?: any) {
    Logger.print('warning', message);
  }

  static error(message?: any) {
    Logger.print('error', message);
  }
}
