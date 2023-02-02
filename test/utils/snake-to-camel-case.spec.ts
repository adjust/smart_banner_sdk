import { stringToCamelCase, snakeToCamelCase, SnakeToCamelCaseObjectKeys } from './../../src/utils/snake-to-camel-case';

describe('snake_case to camelCase', () => {
  describe('String to camelCase', () => {
    const testSet = [
      ['snake_case', 'snakeCase'],
      ['kebab-case', 'kebabCase'],
      ['long-snake-case', 'longSnakeCase'],
      ['long-kebab-case', 'longKebabCase']
    ];

    test.each(testSet)('transforms %s to %s', (input: string, expected: string) => {
      expect(stringToCamelCase(input)).toBe(expected);
    });

    it('does not fail on empty string', () => {
      expect(stringToCamelCase('')).toBe('');
    })
  });

  describe('Object keys to camelCase', () => {
    it('transforms object keys', () => {
      const input = {
        snake_case: true,
        person_id: 'some_id',
        first_name: 'Liz',
        last_Name: 'Lemon',
        year_of_birth: 1970,
      }

      const result: SnakeToCamelCaseObjectKeys<typeof input> = {
        snakeCase: true,
        personId: 'some_id',
        firstName: 'Liz',
        lastName: 'Lemon',
        yearOfBirth: 1970,
      }

      expect(snakeToCamelCase(input)).toEqual(result)
    })

    it('does not transform nested objects', () => {
      const input = {
        snake_case: true,
        additional_data: {
          nested_key: 'value'
        }
      }

      const result: SnakeToCamelCaseObjectKeys<typeof input> = {
        snakeCase: true,
        additionalData: {
          nested_key: 'value'
        }
      }

      expect(snakeToCamelCase(input)).toEqual(result)
    })
  })

});
