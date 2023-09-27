import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import Button from "../components/common/Button"
import { GameContext } from "../game/context"
import messages from "../messages"
import { API_URL } from "../utils/urls"

const Start: React.FC = () => {
  const { state, dispatch } = useContext(GameContext)

  const { formatMessage } = useIntl()

  const categories: string[] = ["noun", "verb", "adjective", "adverb", "random"]

  const fetchRandomWord = async (category: string, language: string) => {
    try {
      const response = await fetch(API_URL(category, language))
      if (!response.ok) {
        throw new Error("Failed to fetch random word")
      }
      const data = await response.json()
      dispatch({ type: "UPDATE_GAME_STATE", payload: "Play" })
      dispatch({ type: "SET_RANDOM_WORD", payload: data })
    } catch (error) {
      console.error("Error fetching random word:", error)
    }
  }

  // need to fix language for categories as well... (all in EN for now)
  return (
    <>
      <Preamble>{formatMessage(messages.instructions)}</Preamble>
      <ButtonsDiv>
        {categories.map((category: string) => (
          <Button
            key={category}
            onClick={() => fetchRandomWord(category, state.language)}
          >
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