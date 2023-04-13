import { parseGetParams } from '@sdk/utils/parse-get-params';

describe('GET params parsing', () => {
  it('returns an object with parameters and their values', () => {
    expect(parseGetParams('https://example.com?name=Liz&surname=Lemon')).toEqual({ name: 'Liz', surname: 'Lemon' });
  });

  it('returns true as value if parameter contains only name', () => {
    expect(parseGetParams('https://example.com?new_user')).toEqual({ new_user: true });

    expect(parseGetParams('https://example.com?new_user&name=Liz&surname=Lemon'))
      .toEqual({ name: 'Liz', surname: 'Lemon', new_user: true });

    expect(parseGetParams('https://example.com?new_user&discount'))
      .toEqual({ discount: true, new_user: true });
  });

  it('returns an empty object if there is no URL parameters', () => {
    expect(parseGetParams('https://example.com')).toEqual({});
    expect(parseGetParams('https://example.com?')).toEqual({});
    expect(parseGetParams('https://example.com?&')).toEqual({});
  });
});
