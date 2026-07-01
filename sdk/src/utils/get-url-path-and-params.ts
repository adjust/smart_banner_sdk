/**
 * Extracts path and parameters from passed url as string.
 */
export function getUrlPathAndParams(pageUrl: string): string {
  if (!pageUrl) {
    return '';
  }

  try {
    const parsedUrl = new URL(pageUrl, 'http://localhost');
    const path = parsedUrl.pathname.replace(/^\/+/, '');

    return `${path}${parsedUrl.search}`;
  } catch {
    return '';
  }
}
