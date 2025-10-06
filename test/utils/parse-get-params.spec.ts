import { parseGetParams } from '@sdk/utils/parse-get-params';

describe('GET params parsing', () => {
  it('returns an object with parameters and their values', () => {
    expect(parseGetParams('https://example.com?name=Liz&surname=Lemon')).toEqual({ name: 'Liz', surname: 'Lemon' });
  });

  it.each([
    ['https://example.com?name=Liz&surname=Lemon&age=', { age: '' }],
    ['https://example.com?name=Liz&surname=Lemon&age=&job=', { age: '', job: '' }],
    ['https://example.com?name=Liz&surname=Lemon&age=0', { age: '0' }], // not falsy actually because it's a non-empty string
    ['https://example.com?name=Liz&surname=Lemon&age=0&job=null', { age: '0', job: 'null' }],
  ])('returns empty and falsy values propelry', (url, expected) => {
    expect(parseGetParams(url)).toEqual({
      name: 'Liz',
      surname: 'Lemon',
      ...expected
    });
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
