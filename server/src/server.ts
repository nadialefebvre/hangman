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

let wordToGuess = ""

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
    const wordsListToUse = data[category as string]

    return wordsListToUse[Math.floor(Math.random() * wordsListToUse.length)]
  }

  // add a max length for word, for example: `&& word.length > 10`
  const isValidWord = (word: string): boolean => word === word.toLowerCase()

  try {
    if (language === "fr") {
      return setRandomWord(frData)
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
    } else if (language === "sv") {
      return setRandomWord(svData)
    }

    let response
    do {
      response = await fetch(`${EXTERNAL_API_URL}?type=${category}`, {
        method: "GET",
        headers: { "X-Api-Key": `${process.env.REACT_APP_API_NINJAS_KEY}` },
      })

      const data = await response.json()
      wordToGuess = data.word
    } while (!isValidWord(wordToGuess))
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