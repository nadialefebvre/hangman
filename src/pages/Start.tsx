import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import Button from "../components/common/Button"
import { GameContext } from "../game/context"
import messages from "../messages"
import { getRandomWord } from "../utils/getRandomWord"

const Start: React.FC = () => {
  const { state, dispatch } = useContext(GameContext)

  const { formatMessage } = useIntl()

  const types: string[] = ["noun", "verb", "adjective", "adverb", "random"]

  const handleGetRandomWord = async (type: string): Promise<void> => {
    const isValidWord = (word: string): boolean => {
      return word === word.toLowerCase()
    }

    let word: string | void = await getRandomWord(type, state.language)
    while (word && !isValidWord(word)) {
      word = await getRandomWord(type, state.language)
    }

    if (word) {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "Play" })
      dispatch({ type: "SET_RANDOM_WORD", payload: word })
    }
  }

  return (
    <>
      <Preamble>{formatMessage(messages.instructions)}</Preamble>
      <ButtonsDiv>
        {types.map((type: string) => (
          <Button key={type} onClick={() => handleGetRandomWord(type)}>
            {type}
          </Button>
        ))}
      </ButtonsDiv>
    </>
  )
}

export default Start

const Preamble = styled.h2`
  font-family: "Press Start 2P";
  font-size: 32px;
  line-height: 156%;
  color: #000000;
  text-align: center;
`

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
`
