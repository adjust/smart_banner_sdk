import { Localization } from '@sdk/data/types';
import { getLanguage, getCompatibleZhLanguage } from '@sdk/utils/language';

describe('Detecting browser language', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.each([
    { languages: ['fr', 'en-US'], language: 'ru-RU', expected: 'fr' },
    { languages: ['en-US', 'fr'], language: 'ru-RU', expected: 'en' },
  ])('reads language tag from Navigator.languages array', ({ languages, language, expected }) => {
    jest.spyOn(global.navigator, 'languages', 'get').mockReturnValue(languages);
    jest.spyOn(global.navigator, 'language', 'get').mockReturnValue(language);

    expect(getLanguage()).toBe(expected);
  });

  test.each([
    { languages: [], language: 'fr', expected: 'fr' },
    { languages: undefined, language: 'ru-RU', expected: 'ru' },
  ])('reads language tag from Navigator.language', ({ languages, language, expected }) => {
    jest.spyOn(global.navigator, 'languages', 'get').mockReturnValue(languages as any);
    jest.spyOn(global.navigator, 'language', 'get').mockReturnValue(language);

    expect(getLanguage()).toBe(expected);
  });

  test.each([
    { languages: [], language: undefined },
    { languages: undefined, language: '' },
  ])('returns `null` if unable to read Navigator.languages nor Navigator.language', ({ languages, language }) => {
    jest.spyOn(global.navigator, 'languages', 'get').mockReturnValue(languages as any);
    jest.spyOn(global.navigator, 'language', 'get').mockReturnValue(language as any);

    expect(getLanguage()).toBe(null);
  });

  test.each([
    // Simplified Chinese
    { language: 'zh-Hans', expected: 'zh-hans' },
    { language: 'zh-CN', expected: 'zh-hans' },
    // Traditional Chinese
    { language: 'zh-Hant', expected: 'zh-hant' },
    { language: 'zh-TW', expected: 'zh-hant' },
    // No specific handler
    { language: 'zh', expected: 'zh' },
    { language: 'zh-HK', expected: 'zh' },
  ])('converts Chinese language tag to known value', ({ language, expected }) => {
    jest.spyOn(global.navigator, 'languages', 'get').mockReturnValue([]);
    jest.spyOn(global.navigator, 'language', 'get').mockReturnValue(language);

    expect(getLanguage()).toBe(expected);
  });
});

describe('Using proper zh language from data', () => {
  const en = { title: 'en title', description: 'English' } as Localization;
  const zh = { title: 'zh title', description: 'Deprecated Chinese locale' } as Localization;
  const zhHans = { title: 'zh-hans title', description: 'Simplified Chinese' } as Localization;
  const zhHant = { title: 'zh-hant title', description: 'Traditional Chinese' } as Localization;

  const localization = { en, zh, 'zh-hans': zhHans, 'zh-hant': zhHant };

  test.each([
    'en',
    null,
    'de'
  ])('returns original value when detected language is not one of zh, zh-hant, zh-hans', (lang) => {
    expect(getCompatibleZhLanguage(localization, lang)).toBe(lang);
  });

  test.each([
    'zh',
    'zh-hans',
    'zh-hant'
  ])('returns original value when detected language is one of zh, zh-hant, zh-hans and such localization is present', (lang) => {
    expect(getCompatibleZhLanguage(localization, lang)).toBe(lang);
  });

  test.each([
    'zh-hans',
    'zh-hant'
  ])('returns zh when modern locale is detected but data contains only zh localization data', (lang) => {
    expect(getCompatibleZhLanguage({ en, zh }, lang)).toBe('zh');
  });

  test.each([
    'zh',
    'zh-hans',
    'zh-hant'
  ])('returns null when detected language is not present in localization data', (lang) => {
    expect(getCompatibleZhLanguage({ en }, lang)).toBe(null);
  });

  describe('detected browser language is zh', () => {
    it('priorities zh-hans', () => {
      expect(getCompatibleZhLanguage({ en, 'zh-hans': zhHans, 'zh-hant': zhHant }, 'zh')).toBe('zh-hans');
    });

    it('returns zh-hant if there is no zh-hans in localization data', () => {
      expect(getCompatibleZhLanguage({ en, 'zh-hant': zhHant }, 'zh')).toBe('zh-hant');
    });

    it('returns null if no appropriate localization found', () => {
      expect(getCompatibleZhLanguage({ en }, 'zh')).toBe(null);
    });
  });

});
