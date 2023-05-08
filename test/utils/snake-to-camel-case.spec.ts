import { snakeToCamelCase, SnakeCaseKeysToCamelCase, stringToCamelCase } from '@sdk/utils/snake-to-camel-case';

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
    });
  });

  describe('Object keys to camelCase', () => {
    it('transforms object keys', () => {
      const testing = {
        snake_case: true,
        person_id: 'some_id',
        first_name: 'Liz',
        last_Name: 'Lemon',
        year_of_birth: 1970,
        key_for_null: null,
        empty_value: ''
      };

      const expected: SnakeCaseKeysToCamelCase<typeof testing> = {
        snakeCase: true,
        personId: 'some_id',
        firstName: 'Liz',
        lastName: 'Lemon',
        yearOfBirth: 1970,
        keyForNull: null,
        emptyValue: '',
      };

      expect(snakeToCamelCase(testing)).toEqual(expected);
    });

    it('does transform nested objects', () => {
      const testing = {
        snake_case: true,
        additional_data: {
          nested_key: 'value'
        },
        deeply_nested: {
          nested_key: {
            more_layers: ['one', 'two'],
            key_for_null: null,
            empty_value: ''
          }
        },
      };

      const expected: SnakeCaseKeysToCamelCase<typeof testing> = {
        snakeCase: true,
        additionalData: {
          nestedKey: 'value'
        },
        deeplyNested: {
          nestedKey: {
            moreLayers: ['one', 'two'],
            keyForNull: null,
            emptyValue: '',
          }
        },
      };

      expect(snakeToCamelCase(testing)).toEqual(expected);
    });
  });

});
