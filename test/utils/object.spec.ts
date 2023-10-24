import { omitNotDefined } from '@sdk/utils/object';

type Maybe<T> = T | undefined | null

type ObjectWithAnyProps<T> = Record<string, Maybe<T>>

type ObjectWithDefinedProps<T> = Record<string, T>

type Object = ObjectWithAnyProps<unknown>

type ExpectedObject = ObjectWithDefinedProps<unknown>

describe('Object utilities', () => {
  describe('omitNotDefined', () => {
    const testSet: [Object, ExpectedObject][] = [
      [{ foo: null, bar: 42 }, { bar: 42 }],
      [{ foo: 'bar', bar: undefined }, { foo: 'bar' }],
      [{ foo: '', bar: 42 }, { bar: 42 }],
      [{ foo: 'bar', bar: [] }, { foo: 'bar', bar: [] }],
      [{ foo: 'bar', bar: {} }, { foo: 'bar', bar: {} }],
      [{ foo: undefined, bar: undefined }, {}],
      [{}, {}],
      [{ foo: 'bar', bar: 42 }, { foo: 'bar', bar: 42 }],
    ]

    test.each(testSet)('omits mot defined properties: %s => %s', (obj: Object, expected: ExpectedObject) => {
      expect(omitNotDefined(obj)).toEqual(expected);
    });
  })
});
