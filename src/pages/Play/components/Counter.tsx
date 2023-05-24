import React, { useContext } from "react"

import styled from "styled-components/macro"

import { GameContext } from "../../../game/context"

import { GuessState, LetterItem } from "../../../game/types"

const Counter: React.FC = () => {
  const { state } = useContext(GameContext)

  const letters: LetterItem[] = state.letters

  const badGuesses: LetterItem[] = letters.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )
  const remainingGuessesCount: number = 8 - badGuesses.length

  return (
    <TextCounter>
      {remainingGuessesCount}{" "}
      {remainingGuessesCount === 1 ? "chance" : "chances"} left
    </TextCounter>
  )
}

export default Counter

const TextCounter = styled.div`
  font-family: "Press Start 2P";
  font-size: 32px;
`
