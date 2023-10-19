import React, { useContext } from "react"
import styled from "styled-components/macro"

import { GameContext } from "../../../game/context"
import { GuessStatus, Letter } from "../../../game/types"
import { stringWithoutDiacritics } from "../../../utils/stringWithoutDiacritics"

const Word: React.FC = () => {
  const { state } = useContext(GameContext)

  const wordLetters: string[] = Array.from(state.randomWord)

  const alphabet: Letter[] = state.alphabet

  const isACorrectGuess = (wordLetter: string): boolean => {
    const letterIndex: number = alphabet.findIndex(
      (letter: Letter) =>
        letter.character === stringWithoutDiacritics(wordLetter, state.language)
    )
    return alphabet[letterIndex].guessStatus === GuessStatus.Correct
  }

  return (
    <StyledWord>
      {wordLetters.map((letter: string, i) => (
        <SingleLetter key={`${i}${letter}`} isVisible={isACorrectGuess(letter)}>
          <span>{letter}</span>
        </SingleLetter>
      ))}
    </StyledWord>
  )
}

export default Word

const StyledWord = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
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
    font-size: 48px;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  }
`
