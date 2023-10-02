import React, { useContext } from "react"
import styled from "styled-components/macro"

import { GameContext } from "../../../game/context"
import { GuessState } from "../../../game/types"
import useGuessOneLetter from "../hooks/useGuessOneLetter"

interface LetterButtonProps {
  letter: string
  isEndOfGame: boolean
  guessState: GuessState | undefined
}

const LetterButton: React.FC<LetterButtonProps> = ({
  letter,
  isEndOfGame,
  guessState,
}) => {
  const { guessOneLetter } = useGuessOneLetter()

  const { state } = useContext(GameContext)

  return (
    <LetterButtonStyled
      isSwedishKeyboard={state.language === "sv"}
      disabled={guessState !== "PENDING" || isEndOfGame}
      onClick={() => guessOneLetter(letter)}
      isEndOfGame={isEndOfGame}
      guessState={guessState}
    >
      <span>{letter}</span>
    </LetterButtonStyled>
  )
}

export default LetterButton

interface LetterButtonStyledProps {
  isSwedishKeyboard: boolean
  isEndOfGame: boolean
  guessState: GuessState | undefined
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
    background: ${({ guessState }) =>
      guessState === "CORRECT"
        ? "rgba(0, 128, 0, 0.1)"
        : "rgba(255, 0, 0, 0.1)"};

    background: ${({ guessState, isEndOfGame }) =>
      guessState === "PENDING" && isEndOfGame && "rgba(54, 54, 54, 0.1)"};
  }

  span {
    font-family: "Press Start 2P";
    font-size: 32px;
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
  }
`
