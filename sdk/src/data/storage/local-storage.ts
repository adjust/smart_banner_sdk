import { parseJson } from '../../utils/json';
import { Storage } from './storage';

type Anything = any; // eslint-disable-line  @typescript-eslint/no-explicit-any

export class LocalStorage implements Storage {
  constructor(private storageName: string = 'adjust-smart-banner') { }

  setItem(key: string, value: Anything): void {
    localStorage.setItem(`${this.storageName}.${key}`, JSON.stringify(value));
  }

  getItem(key: string): Anything | null {
    const value = localStorage.getItem(`${this.storageName}.${key}`);
    return parseJson(value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(`${this.storageName}.${key}`);
  }
}
