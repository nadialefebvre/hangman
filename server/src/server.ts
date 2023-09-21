import "dotenv/config"
import express from "express"

const app = express()

const port = process.env.PORT || 8080

app.get("/", (req, res) => {
  res.send("This is my server!")
})

app.get("/randomword", async (req, res) => {
  const { category } = req.query

  const getRandomWord = await fetch(
    `https://api.api-ninjas.com/v1/randomword?type=${category}`,
    {
      method: "GET",
      headers: { "X-Api-Key": `${process.env.REACT_APP_API_NINJAS_KEY}` },
    }
  )

  const json = await getRandomWord.json()

  res.send(json.word)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
