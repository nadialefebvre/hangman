import React, { useContext } from "react"
import { useIntl } from "react-intl"

import styled from "styled-components/macro"

import Button from "../components/common/Button"
import { GameContext } from "../game/context"

import { fetchValidRandomWord } from "../utils/fetchValidRandomWord"
import messages from "../messages"

const Start: React.FC = () => {
  const types: string[] = ["noun", "verb", "adjective", "adverb", "any type"]

  const { formatMessage } = useIntl()
  const { dispatch } = useContext(GameContext)

  const handleFetchRandomWord = async (type: string): Promise<void> => {
    const word: string | void = await fetchValidRandomWord(type)

    if (word) {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "Play" })
      dispatch({ type: "SET_RANDOM_WORD", payload: word })
    }
  }

  return (
    <>
      <Preamble>{formatMessage(messages.instructions)}</Preamble>

      {/* <Preamble>Choose a type or go for any type</Preamble> */}
      <ButtonsDiv>
        {types.map((type: string) => (
          <Button key={type} onClick={() => handleFetchRandomWord(type)}>
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
