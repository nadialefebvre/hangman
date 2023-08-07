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

const userLanguage = navigator.language.split("-")[0]
console.log(userLanguage)

let localeData = require("./en.json")
if (userLanguage === "fr") {
  localeData = require("./fr.json")
} else if (userLanguage === "sv") {
  localeData = require("./sv.json")
}

const App: React.FC = () => {
  const { state } = useContext(GameContext)
  console.log(state.randomWord)

  const letters: LetterItem[] = state.letters

  const badGuesses: LetterItem[] = letters.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )

  const steps: number[] = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <IntlProvider locale={userLanguage} messages={localeData}>
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
          <Header test={badGuesses.length} />
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
