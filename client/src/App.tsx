import React, { useContext } from "react"
import { IntlProvider } from "react-intl"
import styled, { createGlobalStyle, css } from "styled-components/macro"

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
  console.log(state.randomWord)

  let localeData = require(`./translations/${defaultLanguage}.json`)
  if (supportedLanguages.includes(state.language)) {
    localeData = require(`./translations/${state.language}.json`)
  }

  const alphabet: LetterItem[] = state.alphabet

  const wrongGuesses: LetterItem[] = alphabet.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )

  // too long, should move OuterWrapper into its own file?
  const steps = [
    { number: 1, rowStart: 1, rowSpan: 1, colStart: 1, colSpan: 4 },
    { number: 2, rowStart: 1, rowSpan: 1, colStart: 5, colSpan: 4 },
    { number: 3, rowStart: 1, rowSpan: 4, colStart: 8, colSpan: 1 },
    { number: 4, rowStart: 5, rowSpan: 4, colStart: 8, colSpan: 1 },
    { number: 5, rowStart: 8, rowSpan: 1, colStart: 5, colSpan: 4 },
    { number: 6, rowStart: 8, rowSpan: 1, colStart: 1, colSpan: 4 },
    { number: 7, rowStart: 5, rowSpan: 4, colStart: 1, colSpan: 1 },
    { number: 8, rowStart: 1, rowSpan: 4, colStart: 1, colSpan: 1 },
  ]

  return (
    <IntlProvider locale={state.language} messages={localeData}>
      <GlobalStyle />

      <OuterWrapper gamePhase={state.gamePhase}>
        {state.gamePhase === "Play" &&
          steps.map((step) => (
            <Step
              key={step.number}
              rowStart={step.rowStart}
              rowSpan={step.rowSpan}
              colStart={step.colStart}
              colSpan={step.colSpan}
              hasBackground={step.number <= wrongGuesses.length}
            />
          ))}
        <InnerWrapper>
          <Header wrongGuessesCount={wrongGuesses.length} />
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
// win et lose sont pareils: à combiner, et mettre background vert si win
// fix type any
const OuterWrapper = styled.div<{ gamePhase: any }>`
  display: grid;
  grid-template-columns: 50px repeat(6, 1fr) 50px;
  grid-template-rows: 50px repeat(6, 1fr) 50px;
  width: 100vw;
  height: 100vh;
  ${({ gamePhase }) =>
    gamePhase === "Lose"
      ? css`
          background-color: red;
        `
      : gamePhase === "Win"
      ? css`
          /* background-color: green; */
          background-image: url("./assets/paper-texture.png");
          background-image: url("./assets/paper-texture5.png");
          /* background-image: url("./assets/paper-texture2.jpg"); */
          /* background-image: url("./assets/paper-texture3.png"); */
          background-size: cover;
        `
      : css`
          background-image: url("./assets/paper-texture.png");
          background-image: url("./assets/paper-texture5.png");
          /* background-image: url("./assets/paper-texture2.jpg"); */
          /* background-image: url("./assets/paper-texture3.png"); */
          /* background-image: url("./assets/paper-texture4.png"); */
          background-size: cover;
        `}
`
const InnerWrapper = styled.div`
  margin: 50px;
  grid-row: 2 / span 6;
  grid-column: 2 / span 6;
`

const Step = styled.div<{
  rowStart: number
  rowSpan: number
  colStart: number
  colSpan: number
  hasBackground: boolean
}>`
  grid-row: ${({ rowStart }) => rowStart} / span ${({ rowSpan }) => rowSpan};
  grid-column: ${({ colStart }) => colStart} / span ${({ colSpan }) => colSpan};

  ${({ hasBackground }) =>
    hasBackground &&
    css`
      background-color: red;
    `}
`
