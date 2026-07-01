import { getUrlPathAndParams } from '@utils/get-url-path-and-params';

describe('URL path and params extraction', () => {
  it('returns empty string when no path and no params', () => {
    expect(getUrlPathAndParams('https://example.com')).toBe('');
  });

  it('returns path and query string without domain', () => {
    expect(getUrlPathAndParams('https://example.com/my/cool/page?param=2&test')).toBe('my/cool/page?param=2&test');
  });

  it('returns params only when path is empty', () => {
    expect(getUrlPathAndParams('https://example.com?param=2')).toBe('?param=2');
  });

  it('returns params only when path is "/"', () => {
    expect(getUrlPathAndParams('https://example.com/?param=2')).toBe('?param=2');
  });

  it('ignores the hash part of the url', () => {
    expect(getUrlPathAndParams('https://example.com/my/cool/page?param=2&test#section')).toBe('my/cool/page?param=2&test');
  });
});
