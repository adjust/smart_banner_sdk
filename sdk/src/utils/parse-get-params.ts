/**
 * Extracts GET parameters from passed url and splits them to `key: value` pairs.
 * If URL contains parameter without a value then this parameter considered as boolean and equals true.
 * @returns an object containing GET parameters
 */
export function parseGetParams(pageUrl: string): Record<string, string | true> {
  const startIndex = pageUrl.indexOf('?');
  if (startIndex < 0) {
    return {};
  }

  const pairs = pageUrl.substring(startIndex + 1).split('&');

  return pairs.reduce((acc, pair) => {
    const [key, value] = pair.split('=');

    if (!key) {
      return acc;
    }

    return { ...acc, [key]: value || true };
  }, {});
}
