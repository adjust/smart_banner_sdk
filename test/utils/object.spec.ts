import { omitNotDefined } from '@sdk/utils/object';

type Maybe<T> = T | undefined | null

type ActualObj<T> = Record<string, Maybe<T>>

type ExpectedObj<T> = Record<string, T>

describe('Object utilities', () => {
  describe('omitNotDefined', () => {
    const testSet: [ActualObj<unknown>, ExpectedObj<unknown>][] = [
      [{ foo: null, bar: 42 }, { bar: 42 }],
      [{ foo: 'bar', bar: undefined }, { foo: 'bar' }],
      [{ foo: '', bar: 42 }, { bar: 42 }],
      [{ foo: 'bar', bar: [] }, { foo: 'bar', bar: [] }],
      [{ foo: 'bar', bar: {} }, { foo: 'bar', bar: {} }],
      [{ foo: undefined, bar: undefined }, {}],
      [{}, {}],
      [{ foo: 'bar', bar: 42 }, { foo: 'bar', bar: 42 }],
    ]

    test.each(testSet)('omits mot defined properties: %s => %s', (obj: ActualObj<unknown>, expected: ExpectedObj<unknown>) => {
      expect(omitNotDefined(obj)).toEqual(expected);
    });
  })
});
