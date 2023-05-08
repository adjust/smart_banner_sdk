import { Network } from './network';
import { XhrNetwork } from './xhr-network';
import { NetworkWithDataResidency } from './data-residency/data-residency-network';
import { DataResidency, DataResidencyRegion } from './data-residency/data-residency';
import { ENDPOINTS } from './data-residency/endpoints';

export interface NetworkConfig {
  dataEndpoint?: string;
  dataResidencyRegion?: DataResidencyRegion;
}

export class NetworkFactory {
  private static readonly DEFAULT_DATA_ENDPOINT = 'https://' + ENDPOINTS.default.app;
  private static readonly DEFAULT_TRACKER_ENDPOINT = ENDPOINTS.default.app;

  static create(config: NetworkConfig): Network {
    const dataEndpoint = config.dataEndpoint || this.DEFAULT_DATA_ENDPOINT;

    if (config.dataResidencyRegion) {
      return new NetworkWithDataResidency(new XhrNetwork(dataEndpoint), new DataResidency(config.dataResidencyRegion));
    }

    const network = new XhrNetwork(dataEndpoint);
    network.trackerEndpoint = this.DEFAULT_TRACKER_ENDPOINT;
    return network;
  }
}
