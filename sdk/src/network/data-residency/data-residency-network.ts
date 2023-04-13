import { NetworkDecorator, Network } from '../network';
import { DataResidency } from './data-residency';

/**
 * Implementation of Network which uses DataResidency to get tracker endpoint
 */
export class NetworkWithDataResidency extends NetworkDecorator {
  constructor(network: Network, private dataResidency: DataResidency) {
    super(network);

    this.trackerEndpoint = this.dataResidency.endpoint;
  }

  /**
   * Sends a request to provided path
   *
   * @param path
   * @param params non-encoded parameters of the request
   */
  public request<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.network.request(path, params);
  }
}
