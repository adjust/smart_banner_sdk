import { ENDPOINTS } from './url-strategy/endpoints';
import { NetworkDecorator, Network } from './network';
import { UrlStrategy } from './url-strategy/url-strategy';
import { UrlStrategyFactory, UrlStrategyConfig } from './url-strategy/url-strategy-factory';
import { NetworkError } from './errors';

export type UrlStrategyParameters = {
  instance: UrlStrategy;
  config?: never;
} | {
  instance?: never;
  config: UrlStrategyConfig;
}

export class NetworkWithUrlStrategy extends NetworkDecorator {
  private static readonly DEFAULT_ENDPOINT = ENDPOINTS.default.app;
  private lastSuccessfulEndpoint: string | undefined;
  private urlStrategy: UrlStrategy;

  constructor(network: Network, { instance, config }: UrlStrategyParameters) {
    super(network);

    this.urlStrategy = instance || UrlStrategyFactory.create(config);
  }

  /**
   * Returns last succesfull endpoint or default (`https://app.adjust.com`) one
   */
  public get endpoint(): string {
    return this.lastSuccessfulEndpoint || NetworkWithUrlStrategy.DEFAULT_ENDPOINT;
  }

  /**
   * Sends a request to provided path choosing origin with UrlStrategy and caches used origin if it was successfully
   * reached
   *
   * @param path
   * @param params non-encoded parameters of the request
   */
  public request<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {

    return this.urlStrategy.retries((baseUrlsMap) => {
      this.network.trackerEndpoint = baseUrlsMap.app;

      return this.network.request<T>(path, params)
        .then((result: T) => {
          this.lastSuccessfulEndpoint = baseUrlsMap.app;
          return result;
        })
        .catch((err: NetworkError) => {
          this.lastSuccessfulEndpoint = undefined;
          throw err;
        });
    });
  }
}
