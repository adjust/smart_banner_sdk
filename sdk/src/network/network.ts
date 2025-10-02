export interface Network {
  request: <T>(path: string, params?: Record<string, string | number | boolean>) => Promise<T>;
}
