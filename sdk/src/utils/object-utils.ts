/**
 * Returns true if passed argument is an Object and does not contain properties, and false otherwise
 */
export function isEmptyObject(obj: Record<string, unknown> | undefined) {
  return !!(
    obj &&
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  );
}
