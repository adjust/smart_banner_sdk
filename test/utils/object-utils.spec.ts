import { isEmptyObject } from '@sdk/utils/object-utils';

describe('Object utilities', () => {
  describe('isEmptyObject', () => {
    class Whatever {
      constructor() { } // eslint-disable-line @typescript-eslint/no-empty-function
    }

    it.each([
      { obj: {}, expected: true },
      { obj: { key: 'value' }, expected: false },
      { obj: new Whatever(), expected: false }, // note: obj is stringified as {}
      { obj: null, expected: false },
      { obj: undefined, expected: false },
      { obj: '', expected: false },
      { obj: 4, expected: false },
      { obj: [], expected: false },
    ])('returns $expected for $obj', ({ obj, expected }) => {
      expect(isEmptyObject(obj as any)).toEqual(expected);
    });
  });
});
