import React, { useContext, useEffect, useState } from "react"
import { IntlProvider } from "react-intl"

import Footer from "../components/Footer"
import GameGrid from "../components/GameGrid"
import Header from "../components/Header"
import Loading from "../components/Loading"
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
  const [isLoading, setIsLoading] = useState(false)

  console.log(randomWord) // remove eventually

  const localeData = getLocaleData(language)

  const wrongGuessesCount: number = alphabet.filter(
    (item) => item.guessStatus === GuessStatus.Wrong
  ).length

  useEffect(() => {
    const stepToUse = phase === "RESULT" ? 8 : wrongGuessesCount
    updateFavicon(stepToUse, phase, result)
  }, [wrongGuessesCount, phase, result])

  const renderPhaseContent = () => {
    if (isLoading) {
      return <Loading />
    } else {
      switch (phase) {
        case "START":
          return <Start setIsLoading={setIsLoading} />
        case "PLAY":
          return <Play />
        case "RESULT":
          return <Result />
        default:
          return null
      }
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
