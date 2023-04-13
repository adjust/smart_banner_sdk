import { interpolate } from '@sdk/utils/template-interpolaion';

describe('Template interpolation', () => {
  const template = 'Hello {username}, you have {action}.';

  it('changes all placeholders occurences to values from context', () => {
    const context = { username: 'Kate', action: 'succesfully logged in' };

    expect(interpolate(template, context)).toEqual('Hello Kate, you have succesfully logged in.');
  });

  it('properly changes ', () => {
    const template = 'Hello {username}, you have {cats} cats.';

    expect(interpolate(template, { username: 'Kate', cats: 5 })).toEqual('Hello Kate, you have 5 cats.');
    expect(interpolate(template, { username: 'Kate', cats: 'no' })).toEqual('Hello Kate, you have no cats.');
    expect(interpolate(template, { username: 'Kate', cats: true })).toEqual('Hello Kate, you have true cats.');
  });

  it('changes placeholder to empty string if there is no such value in context', () => {
    expect(interpolate(template, { username: 'Kate' })).toEqual('Hello Kate, you have .');
    expect(interpolate(template, { username: 'Kate', cats: '5 cats' })).toEqual('Hello Kate, you have .');
    expect(interpolate(template, { username: 'Kate', action: null })).toEqual('Hello Kate, you have .');
    expect(interpolate(template, { username: 'Kate', action: undefined })).toEqual('Hello Kate, you have .');
  });
});
