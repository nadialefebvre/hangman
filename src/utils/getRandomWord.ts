import frData from "./frWordsList.json"
import svData from "./svWordsList.json"

interface WordsListData {
  [key: string]: string[]
}

export const getRandomWord = async (
  type: string,
  language: string
): Promise<string | void> => {
  const setRandomWord = (data: WordsListData) => {
    const wordsListToUse = data[type]

    return wordsListToUse[Math.floor(Math.random() * wordsListToUse.length)]
  }

  try {
    if (language === "fr") {
      return setRandomWord(frData)
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
    } else if (language === "sv") {
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
    return json.word
  } catch (error) {
    console.error(error)
  }
}
