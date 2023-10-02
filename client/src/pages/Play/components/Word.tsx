import React, { useContext } from "react"
import styled from "styled-components/macro"

import { GameContext } from "../../../game/context"
import { GuessState, LetterItem } from "../../../game/types"
import { stringWithoutDiacritics } from "../../../utils/stringWithoutDiacritics"

const Word: React.FC = () => {
  const { state } = useContext(GameContext)

  const wordLetters: string[] = Array.from(state.randomWord)

  const alphabet: LetterItem[] = state.alphabet

  const isAGoodGuess = (letter: string): boolean => {
    const letterIndex: number = alphabet.findIndex(
      (item: LetterItem) =>
        item.letter === stringWithoutDiacritics(letter, state.language)
    )
    return alphabet[letterIndex].guessState === GuessState.Correct
  }

  return (
    <StyledWord>
      {wordLetters.map((letter: string, i) => (
        <SingleLetter key={`${i}${letter}`} isVisible={isAGoodGuess(letter)}>
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

interface SingleLetterProps {
  isVisible: boolean
}

const SingleLetter = styled.span<SingleLetterProps>`
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
