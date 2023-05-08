export function getLanguage(): string {
  let languageTag = null;

  if (navigator) {
    languageTag = (navigator.languages?.at(0) || navigator.language).split('-')[0];
  }

  return languageTag || 'en'
}
