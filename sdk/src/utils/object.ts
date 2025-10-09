type Maybe<T> = T | undefined | null

/**
 * 
 * @param obj 
 * @returns 
 */
export function omitNotDefined<T = unknown>(obj: Record<string, Maybe<T>>): Record<string, T> {
  const isDefined = (item: { [_key: string]: Maybe<T> }): item is { [_key: string]: T } => {
    const keys = Object.keys(item);
    return item[keys[0]] !== undefined && item[keys[0]] !== null;
  };

  return Object.keys(obj)
    .map(key => { return { [key]: obj[key] }; })
    .filter(isDefined)
    .reduce((acc, current) => {
      return { ...acc, ...current };
    }, {});
}
