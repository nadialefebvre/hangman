import React from "react"
import styled, { css } from "styled-components/macro"

interface GameGridProps {
  result: string
  phase: string
  wrongGuessesCount: number
  children: React.ReactNode
}

const GameGrid: React.FC<GameGridProps> = ({
  result,
  phase,
  wrongGuessesCount,
  children,
}) => {
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
    <OuterWrapper result={result} phase={phase}>
      {phase === "PLAY" &&
        steps.map((step) => (
          <Step
            key={step.number}
            rowStart={step.rowStart}
            rowSpan={step.rowSpan}
            colStart={step.colStart}
            colSpan={step.colSpan}
            hasBackground={step.number <= wrongGuessesCount}
          />
        ))}
      <InnerWrapper>{children}</InnerWrapper>
    </OuterWrapper>
  )
}

export default GameGrid

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
