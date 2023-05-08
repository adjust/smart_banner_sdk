type Callback<T> = (newValue: T) => void

export class Observable<T> {
  private observers: Callback<T>[];

  constructor(private _value: T) {
    this.observers = [];
  }

  public get value() {
    return this._value;
  }

  public set value(newValue) {
    this._value = newValue;

    for (const observer of this.observers) {
      observer(newValue);
    }
  }

  public observe(observer: Callback<T>) {
    this.observers.push(observer);
  }
}
