import frData from "./frWordsList.json"
import svData from "./svWordsList.json"

interface WordData {
  [key: string]: string[]
}

export const fetchValidRandomWord = async (
  type: string
): Promise<string | void> => {
  try {
    if (navigator.language.split("-")[0] === "fr") {
      const wordsListToUse = (frData as WordData)[type]
      const randomWord =
        wordsListToUse[Math.floor(Math.random() * wordsListToUse.length)]

      return randomWord.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    } else if (navigator.language.split("-")[0] === "sv") {
      const wordsListToUse = (svData as WordData)[type]
      const randomWord =
        wordsListToUse[Math.floor(Math.random() * wordsListToUse.length)]

      return randomWord
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
