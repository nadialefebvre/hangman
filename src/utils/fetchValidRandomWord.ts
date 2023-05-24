export const fetchValidRandomWord = async (
  type: string
): Promise<string | void> => {
  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/randomword?type=${type}`,
      {
        method: "GET",
        headers: { "X-Api-Key": `${process.env.REACT_APP_API_NINJAS_KEY}` },
      }
    )
    const json = await res.json()
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
