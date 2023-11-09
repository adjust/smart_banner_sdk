import { interpolate } from '@sdk/utils/template-interpolaion';

describe('Template interpolation', () => {
  it('changes all placeholders occurences to values from context', () => {
    const template = 'Hello {username}, you have {cats} cats.';

    expect(interpolate(template, { username: 'Kate', cats: 5 })).toEqual({ result: 'Hello Kate, you have 5 cats.', notReplaced: [] });
    expect(interpolate(template, { username: 'Kate', cats: 'no' })).toEqual({ result: 'Hello Kate, you have no cats.', notReplaced: [] });
    expect(interpolate(template, { username: 'Kate', cats: true })).toEqual({ result: 'Hello Kate, you have true cats.', notReplaced: [] });
  });

  it('changes placeholder to empty string if there is no such value in context', () => {
    const template = 'Hello {username}, you have {action}.';

    expect(interpolate(template, { username: 'Kate' })).toEqual({ result: 'Hello Kate, you have .', notReplaced: ['action'] });
    expect(interpolate(template, { username: 'Kate', cats: '5 cats' })).toEqual({ result: 'Hello Kate, you have .', notReplaced: ['action'] });
    expect(interpolate(template, { username: 'Kate', action: null })).toEqual({ result: 'Hello Kate, you have .', notReplaced: ['action'] });
    expect(interpolate(template, { username: 'Kate', action: undefined })).toEqual({ result: 'Hello Kate, you have .', notReplaced: ['action'] });
  });

  it('does not throw on empty template', () => {
    expect(interpolate('', { username: 'Kate' })).toEqual({ result: '', notReplaced: [] });
  });
});
