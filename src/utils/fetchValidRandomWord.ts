import { userLanguage } from "../App"

import data from "./words.json"

interface WordData {
  [key: string]: string[]
}

export const fetchValidRandomWord = async (
  type: string
): Promise<string | void> => {
  try {
    if (userLanguage === "fr") {
      const wordsListToUse = (data as WordData)[type]
      const randomWord =
        wordsListToUse[Math.floor(Math.random() * wordsListToUse.length)]

      return randomWord.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    }
    const res = await fetch(
      `https://api.api-ninjas.com/v1/randomword?type=${type}`,
      {
        method: "GET",
        headers: { "X-Api-Key": `${process.env.REACT_APP_API_NINJAS_KEY}` },
      }
    )
    const json = await res.json()
    console.log(json)
    const wordInLowercase = (word: string): string => {
      return word.toLowerCase()
    }

    if (json.word === wordInLowercase(json.word)) {
      return json.word
    } else {
      return fetchValidRandomWord(type)
    }
  } catch (error) {
    console.error(error)
  }
}
