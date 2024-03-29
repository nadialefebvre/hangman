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

  const categories: string[] = ["noun", "verb", "adjective", "adverb", "random"]

  const handleGetRandomWord = async (category: string): Promise<void> => {
    const isValidWord = (word: string): boolean => {
      return word === word.toLowerCase()
    }

    let word: string | void = await getRandomWord(category, state.language)
    while (word && !isValidWord(word)) {
      word = await getRandomWord(category, state.language)
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
        {categories.map((category: string) => (
          <Button key={category} onClick={() => handleGetRandomWord(category)}>
            {category}
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
