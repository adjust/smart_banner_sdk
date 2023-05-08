export interface Storage {
  setItem<T>(key: string, value: T): void;
  getItem<T>(key: string): T | null;
  removeItem(key: string): void;
}
