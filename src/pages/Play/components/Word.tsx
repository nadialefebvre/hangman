import React, { useContext } from "react"

import { v4 as uuidv4 } from "uuid"

import styled from "styled-components/macro"

import { GameContext } from "../../../game/context"
import { GuessState, LetterItem } from "../../../game/types"

const Word: React.FC = () => {
  const { state } = useContext(GameContext)

  const wordLetters: string[] = Array.from(state.randomWord)
  const letters: LetterItem[] = state.letters

  const isAGoodGuess = (letter: string): boolean => {
    const letterIndex: number = letters.findIndex(
      (item: LetterItem) => item.letter === letter
    )
    return letters[letterIndex].guessState === GuessState.Correct
  }

  return (
    <StyledWord>
      {wordLetters.map((letter: string) => (
        <SingleLetter key={uuidv4()} isVisible={isAGoodGuess(letter)}>
          <span>{letter}</span>
        </SingleLetter>
      ))}
    </StyledWord>
  )
}

export default Word

const StyledWord = styled.div`
  margin-bottom: 20px;
`

const SingleLetter = styled.span<{ isVisible: boolean }>`
  border-bottom: 2px solid #000;
  margin: 10px;
  padding: 10px;
  width: 40px;
  height: 40px;

  span {
    font-family: "Press Start 2P";
    font-size: 48px;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  }
`
