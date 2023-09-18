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

  const letters: LetterItem[] = state.letters

  const guessState = (letter: LetterItem) => {
    return letters.find((item) => item === letter)?.guessState
  }

  return (
    <LettersContainer>
      {letters.map((item: LetterItem) => (
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
