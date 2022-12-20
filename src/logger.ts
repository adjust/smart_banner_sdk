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

  private static print(messageLevel: LogLevel, message?: any, ...optionalParams: any[]) {
    if (Logger.LEVELS[messageLevel] < Logger.level) {
      return;
    }

    switch (messageLevel) {
    case 'verbose':
      console.log(message, optionalParams);
      break;
    case 'info':
      console.log(message, optionalParams);
      break;
    case 'warning':
      console.warn(message, optionalParams);
      break;
    case 'error':
      console.error(message, optionalParams);
      break;
    }
  }

  static setLogLevel(level: LogLevel) {
    Logger.level = Logger.LEVELS[level];
  }

  static log(message?: any, ...optionalParams: any[]) {
    Logger.print('verbose', message, optionalParams);
  }

  static warn(message?: any, ...optionalParams: any[]) {
    Logger.print('warning', message, optionalParams);
  }

  static error(message?: any, ...optionalParams: any[]) {
    Logger.print('error', message, optionalParams);
  }
}
