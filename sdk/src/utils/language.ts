export function getLanguage(): string | null {
  let languageTag = null;

  if (navigator) {
    languageTag = ((Array.isArray(navigator.languages) && navigator.languages.length > 0) ? navigator.languages[0] : navigator.language || '').split('-')[0];

    if (languageTag.length < 2) {
      languageTag = null;
    }
  }

  return languageTag || null;
}
