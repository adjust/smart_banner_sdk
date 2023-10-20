export type SnakeToCamelCase<S extends string | number | symbol> =
  S extends `${infer T}_${infer U}` ?
  `${T}${Capitalize<SnakeToCamelCase<U>>}` :
  S

export type SnakeCaseKeysToCamelCase<T extends object> = {
  [K in keyof T as SnakeToCamelCase<K>]: T[K] extends object ? SnakeCaseKeysToCamelCase<T[K]> : T[K]
}


/**
 * Transforms a string from snake_case or kebab-case to camelCase.
 * @param text 
 * @returns 
 */
export function stringToCamelCase(text: string): string {
  const a = text.replace(/[-_]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return a.substring(0, 1).toLowerCase() + a.substring(1);
}

/**
 * Transfroms recursively object keys from snake_case or kebab-case to camelCase.
 * @param obj an object to be transformed
 * @returns a new object with keys in camelCase
 */
export function snakeToCamelCase<T extends Record<string, any>>(obj: T): SnakeCaseKeysToCamelCase<T> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  const entries = Object.entries(obj);
  const mappedEntries = entries.map(
    ([k, v]) => [`${stringToCamelCase(k)}`, snakeToCamelCase(v)]
  );

  return Object.fromEntries(mappedEntries) as SnakeCaseKeysToCamelCase<T>;
}
