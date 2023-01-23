export function getLanguage(): string {
  let languageTag = null;

  if (navigator) {
    const language = (Array.isArray(navigator.languages) && navigator.languages.length > 0) ? navigator.languages[0] : navigator.language;
    languageTag = language.split('-')[0];
  }

  return languageTag || 'en';
}
