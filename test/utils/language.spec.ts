import { getLanguage } from './../../src/utils/language';

describe('Detecting browser language', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.each([
    {languages: ['fr', 'en-US'], language: 'ru-RU', expected: 'fr'},
    {languages: ['en-US', 'fr'], language: 'ru-RU', expected: 'en'},
  ])('reads language tag from Navigator.languages array', ({ languages, language, expected }) => {
    jest.spyOn(global.navigator, 'languages', 'get').mockReturnValue(languages);
    jest.spyOn(global.navigator, 'language', 'get').mockReturnValue(language);

    expect(getLanguage()).toBe(expected);
  });

  test.each([
    {languages: [], language: 'fr', expected: 'fr'},
    {languages: undefined, language: 'ru-RU', expected: 'ru'},
  ])('reads language tag from Navigator.language', ({ languages, language, expected }) => {
    jest.spyOn(global.navigator, 'languages', 'get').mockReturnValue(languages as any);
    jest.spyOn(global.navigator, 'language', 'get').mockReturnValue(language);

    expect(getLanguage()).toBe(expected);
  });

  test.each([
    {languages: [], language: undefined},
    {languages: undefined, language: ''},
  ])('returns default language if unable to read Navigator.languages nor Navigator.language', ({ languages, language }) => {
    jest.spyOn(global.navigator, 'languages', 'get').mockReturnValue(languages as any);
    jest.spyOn(global.navigator, 'language', 'get').mockReturnValue(language as any);

    expect(getLanguage()).toBe('en');
  });
});
