import { Storage } from './storage';

type Anything = any; // eslint-disable-line  @typescript-eslint/no-explicit-any

export class InMemoryStorage implements Storage {
  private items: Record<string, Anything> = {};

  public setItem(key: string, value: Anything): void {
    this.items[key] = value;
  }

  public getItem(key: string): Anything | null {
    return Object.prototype.hasOwnProperty.call(this.items, key) ? this.items[key] : null;
  }

  public removeItem(key: string): void {
    delete this.items[key];
  }
}
