export interface DataSource<K, T> {
  retrieve(key: K): T;
}

export abstract class AsyncDataSource<K, T> implements DataSource<K, Promise<T | null>> {
  abstract retrieve: (key: K) => Promise<T | null>;
}
