import React, { useContext } from "react"
import styled from "styled-components/macro"

import { GameContext } from "../../../game/context"
import { Letter } from "../../../game/types"
import LetterButton from "../components/LetterButton"

const LetterButtonsContainer: React.FC = () => {
  const { state } = useContext(GameContext)

  const alphabet: Letter[] = state.alphabet

  const guessStatus = (letter: Letter) => {
    return alphabet.find((item) => item === letter)?.guessStatus
  }

  return (
    <LettersContainer>
      {alphabet.map((letter: Letter) => (
        <LetterButton
          key={letter.character}
          letter={letter.character}
          guessStatus={guessStatus(letter)}
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
