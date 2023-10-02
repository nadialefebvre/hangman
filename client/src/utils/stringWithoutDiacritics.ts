export const stringWithoutDiacritics = (
  str: string,
  language: string
): string => {
  if (language === "fr") {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  }
  return str
}
