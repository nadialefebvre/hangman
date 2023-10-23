const SUPPORTED_LANGUAGES: string[] = ["en", "fr", "sv"]
const DEFAULT_LANGUAGE: string = "en"

export const getLocaleData = (language: string) => {
  let localeData = require(`../translations/${DEFAULT_LANGUAGE}.json`)
  if (SUPPORTED_LANGUAGES.includes(language)) {
    localeData = require(`../translations/${language}.json`)
  }
  return localeData
}
