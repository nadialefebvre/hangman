import frData from "./frWordsList.json"
import svData from "./svWordsList.json"

interface WordsListData {
  [key: string]: string[]
}

export const fetchValidRandomWord = async (
  type: string
): Promise<string | void> => {
  const setRandomWord = (data: WordsListData) => {
    const wordsListToUse = data[type]

    return wordsListToUse[Math.floor(Math.random() * wordsListToUse.length)]
  }

  try {
    const userLanguage = navigator.language.split("-")[0]

    if (userLanguage === "fr") {
      return setRandomWord(frData)
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
    } else if (userLanguage === "sv") {
      return setRandomWord(svData)
    }

    const res = await fetch(
      `https://api.api-ninjas.com/v1/randomword?type=${type}`,
      {
        method: "GET",
        headers: { "X-Api-Key": `${process.env.REACT_APP_API_NINJAS_KEY}` },
      }
    )

    const json = await res.json()

    const isLowercase = (word: string): boolean => {
      return word === word.toLowerCase()
    }

    if (isLowercase(json.word)) {
      return json.word
    } else {
      return fetchValidRandomWord(type)
    }
  } catch (error) {
    console.error(error)
  }
}
