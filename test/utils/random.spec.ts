import { random } from '@sdk/utils/random'

describe('Random number', () => {
  const testSet = [
    { min: 2, max: 5 },
    { min: 2, max: 2 },
    { min: 0, max: 5 },
    { min: 0, max: 1 },
    { min: 2, max: 3 },
    { min: -7, max: 7 },
    { min: -7, max: 0 },
    { min: -1, max: 0 },
    { min: 9, max: -1 },
    { min: 0, max: 0 },
  ]

  it.each(testSet)('returns a number within [min, max) range', ({ min, max }) => {
    const actualMin = Math.min(min, max);
    const actualMax = Math.max(min, max);

    const result = random(min, max);

    if (max === min) {
      expect(result).toBe(min);
    } else {
      expect(result).toBeGreaterThanOrEqual(actualMin);
      expect(result).toBeLessThan(actualMax);
    }
  })
})
