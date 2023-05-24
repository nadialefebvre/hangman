import React, { useContext } from "react"

import styled from "styled-components/macro"

import Start from "./pages/Start"
import Play from "./pages/Play/Play"
import Lose from "./pages/Lose"
import Win from "./pages/Win"

import { GameContext } from "./game/context"
import Header from "./components/Header"
import Footer from "./components/Footer"

import { GuessState, LetterItem } from "./game/types"

import "./index.css"

const App: React.FC = () => {
  const { state } = useContext(GameContext)
  console.log(state.randomWord)

  const letters: LetterItem[] = state.letters

  const badGuesses: LetterItem[] = letters.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )

  const steps: number[] = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
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
