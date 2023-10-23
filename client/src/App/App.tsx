import React, { useContext, useEffect } from "react"
import { IntlProvider } from "react-intl"

import Footer from "../components/Footer"
import GameGrid from "../components/GameGrid"
import Header from "../components/Header"
import Play from "../components/Play"
import Result from "../components/Result"
import Start from "../components/Start"
import { GameContext } from "../game/context"
import { GuessStatus } from "../game/types"
import { updateFavicon } from "../utils/favicon"
import { getLocaleData } from "../utils/translation"
import GlobalStyle from "./GlobalStyle"

const App: React.FC = () => {
  const { state } = useContext(GameContext)
  const { language, alphabet, result, phase, randomWord } = state

  console.log(randomWord)

  const localeData = getLocaleData(language)

  const wrongGuessesCount: number = alphabet.filter(
    (item) => item.guessStatus === GuessStatus.Wrong
  ).length

  const stepToUse = phase === "RESULT" ? 8 : wrongGuessesCount
  useEffect(() => {
    updateFavicon(stepToUse, phase, result)
  }, [stepToUse, phase, result])

  const renderPhaseContent = () => {
    switch (phase) {
      case "START":
        return <Start />
      case "PLAY":
        return <Play />
      case "RESULT":
        return <Result />
      default:
        return null
    }
  }

  return (
    <IntlProvider locale={language} messages={localeData}>
      <GlobalStyle />
      <GameGrid
        result={result}
        phase={phase}
        wrongGuessesCount={wrongGuessesCount}
      >
        <Header wrongGuessesCount={wrongGuessesCount} />
        {renderPhaseContent()}
        <Footer />
      </GameGrid>
    </IntlProvider>
  )
}

export default App
