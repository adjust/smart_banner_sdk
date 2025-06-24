import { Localization } from "src/data/types";

const zhSimplified = ['zh-hans', 'zh-cn'];
const zhTraditional = ['zh-hant', 'zh-tw'];

export function getLanguage(): string | null {
  let languageTag = null;

  if (navigator) {
    let language = ((Array.isArray(navigator.languages) && navigator.languages.length > 0) ? navigator.languages[0] : navigator.language) || '';
    language = language.toLowerCase();

    if (zhSimplified.includes(language)) {
      return 'zh-hans';
    }
    if (zhTraditional.includes(language)) {
      return 'zh-hant';
    }

    languageTag = language.split('-')[0];

    if (languageTag.length < 2) {
      languageTag = null;
    }
  }

  return languageTag || null;
}

/**
 * Check if data contains detected Chinese language, otherwise try to fallback.
 */
export function getCompatibleZhLanguage(localizations: { [key: string]: Localization }, lang: string | null): string | null {
  const chineseLanguages = ['zh-hans', 'zh-hant'];
  
  if (!lang || !['zh', ...chineseLanguages].includes(lang)) {
    return lang; // It's not Chinese at all
  }

  if (localizations[lang]) {
    return lang; // Localization is present, nothing to do here
  }

  if (chineseLanguages.includes(lang) && localizations['zh']) {
    // We detect one of 'modern' Chinese locale, but there is no such key in localizations data
    return 'zh'; // Fallback to 'outdated' one
  }

  if (lang === 'zh') {
    // We detect zh locale, and localizations data does not contain it
    return localizations[chineseLanguages[0]] ?
      chineseLanguages[0] : // return 'zh-hans' if it's present
      localizations[chineseLanguages[1]]
        ? chineseLanguages[1]  // return 'zh-hant' otherwise
        : null
  }

  return null;
}
