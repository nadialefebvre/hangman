import React, { useContext } from "react"
import styled from "styled-components/macro"

import { GameContext } from "../../../game/context"
import { GuessState, LetterItem } from "../../../game/types"
import useGuessOneLetter from "../hooks/useGuessOneLetter"

interface LetterButtonProps {
  letter: string
  hasBeenGuessed: boolean
  isAGoodGuess: boolean
}

const LetterButton: React.FC<LetterButtonProps> = ({
  letter,
  hasBeenGuessed,
  isAGoodGuess,
}) => {
  const { state } = useContext(GameContext)

  const { guessOneLetter } = useGuessOneLetter()

  const letters: LetterItem[] = state.letters

  const badGuesses: LetterItem[] = letters.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )

  return (
    <LetterButtonStyled
      isSwedish={navigator.language.split("-")[0] === "sv"}
      key={letter}
      disabled={hasBeenGuessed || badGuesses.length === 8}
      onClick={() => guessOneLetter(letter)}
      isAGoodGuess={isAGoodGuess}
      hasBeenGuessed={hasBeenGuessed}
    >
      <span>{letter}</span>
    </LetterButtonStyled>
  )
}

export default LetterButton

interface LetterButtonStyledProps {
  isSwedish: boolean
  isAGoodGuess: boolean
  hasBeenGuessed: boolean
}

const LetterButtonStyled = styled.button<LetterButtonStyledProps>`
  background: #363636;
  margin: ${({ isSwedish }) => (isSwedish ? "10px 4px" : "10px")};
  width: 68px;
  height: 68px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  :disabled {
    background: ${({ isAGoodGuess }) =>
      isAGoodGuess ? "rgba(0, 128, 0, 0.1)" : "rgba(255, 0, 0, 0.1)"};

    background: ${({ hasBeenGuessed }) =>
      !hasBeenGuessed && "rgba(54, 54, 54, 0.1)"};
  }

  span {
    font-family: "Press Start 2P";
    font-size: 32px;
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
  }
`
