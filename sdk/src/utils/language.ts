import { Localization } from "src/data/types";

const chineseSimplified = 'zh-hans';
const chineseTraditional = 'zh-hant';
const chineseSimplifiedVariations = [chineseSimplified, 'zh-cn'];
const zhTraditionalVariations = [chineseTraditional, 'zh-tw'];

export function getLanguage(): string | null {
  let languageTag = null;

  if (navigator) {
    let language = ((Array.isArray(navigator.languages) && navigator.languages.length > 0) ? navigator.languages[0] : navigator.language) || '';
    language = language.toLowerCase();

    if (chineseSimplifiedVariations.includes(language)) {
      return chineseSimplified;
    }
    if (zhTraditionalVariations.includes(language)) {
      return chineseTraditional;
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
  const chineseLanguages = [chineseSimplified, chineseTraditional];
  
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
    
    if(localizations[chineseSimplified]) {
      return chineseSimplified;
    }

    if(localizations[chineseTraditional]) {
      return chineseTraditional;
    }
  }

  return null;
}
