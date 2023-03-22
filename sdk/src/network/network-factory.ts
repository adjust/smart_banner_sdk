import { Network } from './network';
import { XhrNetwork } from './xhr-network';
import { NetworkWithUrlStrategy, UrlStrategyParameters } from './url-startegy-network';

export interface NetworkConfig {
  urlStrategyParameters: UrlStrategyParameters
}

export class NetworkFactory {
  static create(config: NetworkConfig): Network {
    return new NetworkWithUrlStrategy(new XhrNetwork(), config.urlStrategyParameters);
  }
}
