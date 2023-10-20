import React, { useContext } from "react"
import styled from "styled-components/macro"

import { GameContext } from "../../game/context"
import { GuessStatus } from "../../game/types"
import useGuessOneLetter from "../../hooks/useGuessOneLetter"

interface LetterButtonProps {
  letter: string
  guessStatus: GuessStatus | undefined
}

const LetterButton: React.FC<LetterButtonProps> = ({ letter, guessStatus }) => {
  const { guessOneLetter } = useGuessOneLetter()

  const { state } = useContext(GameContext)

  const isEndOfGame = state.result === "WIN" || state.result === "LOSE"

  return (
    <LetterButtonStyled
      isSwedishKeyboard={state.language === "sv"}
      disabled={guessStatus !== GuessStatus.Pending || isEndOfGame}
      onClick={() => guessOneLetter(letter)}
      isEndOfGame={isEndOfGame}
      guessStatus={guessStatus}
    >
      <span>{letter}</span>
    </LetterButtonStyled>
  )
}

export default LetterButton

interface LetterButtonStyledProps {
  isSwedishKeyboard: boolean
  isEndOfGame: boolean
  guessStatus: GuessStatus | undefined
}

const LetterButtonStyled = styled.button<LetterButtonStyledProps>`
  background: #363636;
  margin: ${({ isSwedishKeyboard }) =>
    isSwedishKeyboard ? "10px 4px" : "10px"};
  width: 68px;
  height: 68px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  :disabled {
    background: ${({ guessStatus }) =>
      guessStatus === GuessStatus.Correct
        ? "rgba(0, 128, 0, 0.1)"
        : "rgba(255, 0, 0, 0.1)"};

    background: ${({ guessStatus, isEndOfGame }) =>
      guessStatus === GuessStatus.Pending &&
      isEndOfGame &&
      "rgba(54, 54, 54, 0.1)"};
    cursor: not-allowed;
  }

  span {
    font-size: 32px;
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
  }
`
