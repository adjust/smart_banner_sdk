export type SnakeToCamelCase<S extends string | number | symbol> =
  S extends `${infer T}_${infer U}` ?
  `${T}${Capitalize<SnakeToCamelCase<U>>}` :
  S

export type SnakeToCamelCaseObjectKeys<T extends Record<string, any>> = { [K in keyof T as SnakeToCamelCase<K>]: T[K] }

/**
 * Transforms a string from snake_case, kebab-case to camelCase.
 * @param text 
 * @returns 
 */
export function stringToCamelCase(text: string): string {
  const a = text.toLowerCase().replace(/[-_]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return a.substring(0, 1).toLowerCase() + a.substring(1);
}

/**
 * Transfroms object keys from snake_case to to camelCase. Does NOT transform nested objects.
 * @param obj 
 * @returns a new object with keys in camelCase
 */
export function snakeToCamelCase<T extends Record<string, any>>(obj: T): SnakeToCamelCaseObjectKeys<T> {
  const entries = Object.entries(obj);
  const mappedEntries = entries.map(
    ([k, v]) => [`${stringToCamelCase(k)}`, v]
  );

  return Object.fromEntries(mappedEntries) as SnakeToCamelCaseObjectKeys<T>;
}
