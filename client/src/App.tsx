import React, { useContext, useEffect } from "react"
import { IntlProvider } from "react-intl"
import { createGlobalStyle } from "styled-components/macro"

import Footer from "./components/Footer"
import GameGrid from "./components/GameGrid"
import Header from "./components/Header"
import Play from "./components/Play"
import Result from "./components/Result"
import Start from "./components/Start/"
import { GameContext } from "./game/context"
import { GuessStatus, Letter } from "./game/types"
import { updateFavicon } from "./utils/favicon"
import { getLocaleData } from "./utils/translation"

const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Press Start 2P", cursive;
    /* font-family: "VT323", monospace;
    font-family: "DotGothic16", sans-serif;
    letter-spacing: 8px; */
  }

  body {
    margin: 0;
  }

  button {
    cursor: pointer;
  }
`
const App: React.FC = () => {
  const { state } = useContext(GameContext)
  const { language, alphabet, result, phase, randomWord } = state

  console.log(randomWord)

  const localeData = getLocaleData(language)

  const wrongGuessesCount: number = alphabet.filter(
    (item: Letter) => item.guessStatus === GuessStatus.Wrong
  ).length

  const stepToUse = phase === "RESULT" ? 8 : wrongGuessesCount
  useEffect(() => {
    updateFavicon(stepToUse, phase, result)
  }, [stepToUse, phase, result])

  return (
    <IntlProvider locale={language} messages={localeData}>
      <GlobalStyle />
      <GameGrid
        result={result}
        phase={phase}
        wrongGuessesCount={wrongGuessesCount}
      >
        <Header wrongGuessesCount={wrongGuessesCount} />
        {phase === "START" && <Start />}
        {phase === "PLAY" && <Play />}
        {phase === "RESULT" && <Result />}
        <Footer />
      </GameGrid>
    </IntlProvider>
  )
}

export default App
