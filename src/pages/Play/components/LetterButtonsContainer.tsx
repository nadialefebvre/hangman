import React, { useContext } from "react"

import styled from "styled-components/macro"

import { GameContext } from "../../../game/context"
import { GuessState, LetterItem } from "../../../game/types"

import LetterButton from "../components/LetterButton"

const LetterButtonsContainer: React.FC = () => {
  const { state } = useContext(GameContext)

  const letters: LetterItem[] = state.letters

  const hasBeenGuessed = (letter: string): boolean => {
    const letterIndex: number = letters.findIndex(
      (item: LetterItem) => item.letter === letter
    )
    return letters[letterIndex].guessState !== GuessState.Untouched
  }

  const isAGoodGuess = (letter: string): boolean => {
    const letterIndex: number = letters.findIndex(
      (item: LetterItem) => item.letter === letter
    )
    return letters[letterIndex].guessState === GuessState.Correct
  }

  return (
    <LettersContainer>
      {letters.map((item: LetterItem) => (
        <LetterButton
          key={item.letter}
          letter={item.letter}
          hasBeenGuessed={hasBeenGuessed(item.letter)}
          isAGoodGuess={isAGoodGuess(item.letter)}
        />
      ))}
    </LettersContainer>
  )
}

export default LetterButtonsContainer

const LettersContainer = styled.div`
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
