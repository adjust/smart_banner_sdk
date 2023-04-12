/**
 * Extracts GET parameters from passed url and splits them to  `key: value` pairs
 * @returns an object containing GET parameters
 */
export function parseGetParams(pageUrl: string): Record<string, string> {
  const startIndex = pageUrl.indexOf('?')
  if (startIndex < 0) {
    return {}
  }

  const pairs = pageUrl.substring(startIndex + 1).split('&')

  return pairs.reduce((acc, pair) => {
    const [key, value] = pair.split('=')
    return { ...acc, [key]: value }
  }, {})
}
