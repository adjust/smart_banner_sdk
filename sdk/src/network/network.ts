export interface Network {
  trackerEndpoint: string;
  request: <T>(path: string, params?: Record<string, string | number | boolean>) => Promise<T>;
}

export class NetworkDecorator implements Network {
  constructor(protected network: Network) { }

  public get trackerEndpoint(): string {
    return this.network.trackerEndpoint;
  }

  public set trackerEndpoint(value: string) {
    this.network.trackerEndpoint = value;
  }

  request<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.network.request(path, params);
  }
}
