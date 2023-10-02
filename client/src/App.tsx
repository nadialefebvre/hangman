import React, { useContext } from "react"
import { IntlProvider } from "react-intl"
import styled from "styled-components/macro"

import "./index.css"

import Footer from "./components/Footer"
import Header from "./components/Header"
import { GameContext } from "./game/context"
import { GuessState, LetterItem } from "./game/types"
import Lose from "./pages/Lose"
import Play from "./pages/Play/Play"
import Start from "./pages/Start"
import Win from "./pages/Win"

const supportedLanguages: string[] = ["en", "fr", "sv"]
const defaultLanguage: string = "en"

const App: React.FC = () => {
  const { state } = useContext(GameContext)
  console.log(state.randomWord)

  let localeData = require(`./translations/${defaultLanguage}.json`)
  if (supportedLanguages.includes(state.language)) {
    localeData = require(`./translations/${state.language}.json`)
  }

  const alphabet: LetterItem[] = state.alphabet

  const badGuesses: LetterItem[] = alphabet.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )

  const steps: number[] = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <IntlProvider locale={state.language} messages={localeData}>
      <OuterWrapper
        className={state.gamePhase === "Lose" ? "has-background" : ""}
      >
        {state.gamePhase === "Play" &&
          steps.map((step: number) => (
            <div
              key={step}
              className={`step${step} ${
                step <= badGuesses.length ? "has-background" : ""
              }`}
            />
          ))}
        <InnerWrapper>
          <Header badGuessesCount={badGuesses.length} />
          {state.gamePhase === "Start" && <Start />}
          {state.gamePhase === "Play" && <Play />}
          {state.gamePhase === "Win" && <Win />}
          {state.gamePhase === "Lose" && <Lose />}
          <Footer />
        </InnerWrapper>
      </OuterWrapper>
    </IntlProvider>
  )
}

export default App

const OuterWrapper = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(6, 1fr) 50px;
  grid-template-rows: 50px repeat(6, 1fr) 50px;
  width: 100vw;
  height: 100vh;
`

const InnerWrapper = styled.div`
  grid-row: 2 / span 6;
  grid-column: 2 / span 6;
`
