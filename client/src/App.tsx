import React, { useContext, useEffect } from "react"
import { IntlProvider } from "react-intl"
import styled, { createGlobalStyle, css } from "styled-components/macro"

import Footer from "./components/Footer"
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

  const wrongGuesses: Letter[] = alphabet.filter(
    (item: Letter) => item.guessStatus === GuessStatus.Wrong
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

  const stepToUse = phase === "RESULT" ? 8 : wrongGuesses.length
  useEffect(() => {
    updateFavicon(stepToUse, phase, result)
  }, [stepToUse, phase, result])

  return (
    <IntlProvider locale={language} messages={localeData}>
      <GlobalStyle />
      <OuterWrapper result={result} phase={phase}>
        {phase === "PLAY" &&
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
          {phase === "START" && <Start />}
          {phase === "PLAY" && <Play />}
          {phase === "RESULT" && <Result />}
          <Footer />
        </InnerWrapper>
      </OuterWrapper>
    </IntlProvider>
  )
}

export default App

const OuterWrapper = styled.div<{ result: string; phase: string }>`
  display: grid;
  grid-template-columns: 50px repeat(6, 1fr) 50px;
  grid-template-rows: 50px repeat(6, 1fr) 50px;
  width: 100vw;
  height: 100vh;
  ${({ result, phase }) =>
    result === "LOSE" && phase === "RESULT"
      ? css`
          background-color: red;
        `
      : result === "WIN" && phase === "RESULT"
      ? css`
          background-image: url("./assets/paper-texture2.jpg");
          background-size: cover;
        `
      : css`
          background-image: url("./assets/paper-texture.png");
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
