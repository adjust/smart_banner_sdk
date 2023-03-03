import { Logger } from '../../logger';
import { UrlStrategy } from './url-strategy';
import { BlockedUrlBypass } from './blocked-url-bypass';
import { CustomUrl } from './custom-url';
import { DataResidency } from './data-residency';

export type UrlStrategyConfig = {
  customUrl: string;
  dataResidency?: never;
  urlStrategy?: never;
} | {
  customUrl?: never;
  dataResidency: DataResidency.Region;
  urlStrategy?: never;
} | {
  customUrl?: never;
  dataResidency?: never;
  urlStrategy?: BlockedUrlBypass.Strategy;
}

export class UrlStrategyFactory {
  static readonly incorrectOptionIgnoredMessage = (higherPriority: string, lowerPriority: string) => {
    Logger.warn(`Both ${higherPriority} and ${lowerPriority} are set in config, ${lowerPriority} will be ignored`);
  };

  static create(config: UrlStrategyConfig): UrlStrategy {
    const { customUrl, dataResidency, urlStrategy } = config;

    if (customUrl) {
      if (dataResidency || urlStrategy) {
        this.incorrectOptionIgnoredMessage('customUrl', dataResidency ? 'dataResidency' : 'urlStrategy');
      }

      return new UrlStrategy(CustomUrl.preferredUrlsGetter(customUrl));
    } else if (dataResidency) {
      if (urlStrategy) {
        this.incorrectOptionIgnoredMessage('dataResidency', 'urlStrategy');
      }

      return new UrlStrategy(DataResidency.preferredUrlsGetter(dataResidency));
    } else {
      return new UrlStrategy(BlockedUrlBypass.preferredUrlsGetter(urlStrategy));
    }
  }
}
