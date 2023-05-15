import { Network } from './network';
import { XhrNetwork } from './xhr-network';

export interface NetworkConfig {
  dataEndpoint?: string;
}

export class NetworkFactory {
  private static readonly DEFAULT_DATA_ENDPOINT = 'https://app.adjust.com';

  static create(config: NetworkConfig): Network {
    const dataEndpoint = config.dataEndpoint || this.DEFAULT_DATA_ENDPOINT;

    const network = new XhrNetwork(dataEndpoint);
    return network;
  }
}
