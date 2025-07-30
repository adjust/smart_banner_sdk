/**
 * Wraps JSON.parse() with try-catch.
 * Returns parsed object if successfully parsed and null otherwise.
 */
export function parseJson(str?: string | null): any { // eslint-disable-line  @typescript-eslint/no-explicit-any
  if (!str) {
    return null;
  }

  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}
