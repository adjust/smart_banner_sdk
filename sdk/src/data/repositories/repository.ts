export interface Repository<K, T> {
  fetch(key: K): Promise<T | null>
}
