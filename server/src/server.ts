import cors from "cors"
import "dotenv/config"
import express from "express"

import { ParsedQs } from "qs"
import frData from "./utils/frWordsList.json"
import svData from "./utils/svWordsList.json"

const app = express()
app.use(cors())

const port = process.env.PORT || 8080

const EXTERNAL_API_URL = "https://api.api-ninjas.com/v1/randomword"

app.get("/", (req, res) => {
  res.send("This is my server!")
})

interface WordsListData {
  [key: string]: string[]
}

// need to fix "any" here...
const fetchRandomWord = async (
  category: string | ParsedQs | string[] | ParsedQs[] | undefined,
  language: string | ParsedQs | string[] | ParsedQs[] | undefined
) => {
  // ideally create database with lists of words for FR and SV...
  const setRandomWord = (data: WordsListData) => {
    let wordsListToUse: string[]

    if (category === "random") {
      const categories = Object.keys(data)
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)]
      wordsListToUse = data[randomCategory]
    } else {
      wordsListToUse = data[category as string]
    }

    return wordsListToUse[Math.floor(Math.random() * wordsListToUse.length)]
  }

  const isValidWord = (word: string): boolean =>
    word === word.toLowerCase() && word.length <= 12

  let wordToGuess: string

  try {
    if (language === "fr") {
      wordToGuess = setRandomWord(frData)
    } else if (language === "sv") {
      wordToGuess = setRandomWord(svData)
    } else {
      let response
      do {
        response = await fetch(`${EXTERNAL_API_URL}?type=${category}`, {
          method: "GET",
          headers: { "X-Api-Key": `${process.env.REACT_APP_API_NINJAS_KEY}` },
        })
        const data = await response.json()
        wordToGuess = data.word
      } while (!isValidWord(wordToGuess))
    }

    console.log(wordToGuess)
    return wordToGuess
  } catch (error) {
    console.error("Error fetching random word:", error)
    throw error
  }
}

app.get("/randomword", async (req, res) => {
  const { category, language } = req.query
  try {
    const word = await fetchRandomWord(category, language)
    res.json(word)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch a random lowercase word" })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
