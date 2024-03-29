import React, { useContext } from "react"
import styled from "styled-components/macro"

import { useIntl } from "react-intl"
import { GameContext } from "../../../game/context"
import { GuessState, LetterItem } from "../../../game/types"
import messages from "../../../messages"

const Counter: React.FC = () => {
  const { state } = useContext(GameContext)

  const { formatMessage } = useIntl()

  const letters: LetterItem[] = state.letters

  const badGuesses: LetterItem[] = letters.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )

  const remainingGuessesCount: number = 8 - badGuesses.length

  return (
    <TextCounter>
      {remainingGuessesCount}
      {remainingGuessesCount < 2
        ? formatMessage(messages.counterSingular)
        : formatMessage(messages.counterPlural)}
    </TextCounter>
  )
}

export default Counter

const TextCounter = styled.div`
  font-family: "Press Start 2P";
  font-size: 32px;
`
