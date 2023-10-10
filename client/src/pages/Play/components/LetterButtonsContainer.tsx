import React, { useContext } from "react"
import styled from "styled-components/macro"

import { GameContext } from "../../../game/context"
import { LetterItem } from "../../../game/types"
import LetterButton from "../components/LetterButton"

interface LetterButtonsContainerProps {
  isEndOfGame: boolean
}

const LetterButtonsContainer: React.FC<LetterButtonsContainerProps> = ({
  isEndOfGame,
}) => {
  const { state } = useContext(GameContext)

  const alphabet: LetterItem[] = state.alphabet

  const guessState = (letter: LetterItem) => {
    return alphabet.find((item) => item === letter)?.guessState
  }

  return (
    <LettersContainer>
      {alphabet.map((item: LetterItem) => (
        <LetterButton
          key={item.letter}
          letter={item.letter}
          isEndOfGame={isEndOfGame}
          guessState={guessState(item)}
        />
      ))}
    </LettersContainer>
  )
}

export default LetterButtonsContainer

const LettersContainer = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
