import { Network } from './network';
import { XhrNetwork } from './xhr-network';
import { NetworkWithUrlStrategy, UrlStrategyParameters } from './url-startegy-network';

export interface NetworkConfig {
  dataEndpoint?: string;
  urlStrategy: UrlStrategyParameters;
}

export class NetworkFactory {
  private static readonly DEFAULT_DATA_ENDPOINT = '';

  static create(config: NetworkConfig): Network {
    const dataEndpoint = config.dataEndpoint || this.DEFAULT_DATA_ENDPOINT;
    return new NetworkWithUrlStrategy(new XhrNetwork(dataEndpoint), config.urlStrategy);
  }
}
