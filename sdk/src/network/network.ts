export interface Network {
  request: <T>(path: string, params?: Record<string, string | number | boolean>) => Promise<T>;
}

export class NetworkDecorator implements Network {
  constructor(protected network: Network) { }

  request<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.network.request(path, params);
  }
}
