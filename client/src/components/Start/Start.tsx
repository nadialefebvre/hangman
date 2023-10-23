import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import { GameContext } from "../../game/context"
import { useSetDocumentTitle } from "../../hooks/useSetDocumentTitle"
import { API_URL } from "../../utils/urls"
import messages from "./messages"

const Start: React.FC = () => {
  const { state, dispatch } = useContext(GameContext)
  const { language } = state
  const { formatMessage } = useIntl()

  useSetDocumentTitle(formatMessage(messages.startMessage))

  const categories: string[] = ["noun", "verb", "adjective", "adverb", "random"]

  const fetchRandomWord = async (category: string, language: string) => {
    try {
      const response = await fetch(API_URL(category, language))
      if (!response.ok) {
        throw new Error("Failed to fetch random word")
      }
      const data = await response.json()
      dispatch({ type: "UPDATE_PHASE", payload: "PLAY" })
      dispatch({ type: "SET_RANDOM_WORD", payload: data })
    } catch (error) {
      console.error("Error fetching random word:", error)
    }
  }

  return (
    <>
      <Preamble>{formatMessage(messages.instructions)}</Preamble>
      <ButtonsDiv>
        {categories.map((category: string) => (
          <Button
            key={category}
            onClick={() => fetchRandomWord(category, language)}
          >
            {formatMessage(messages[category as keyof typeof messages])}
          </Button>
        ))}
      </ButtonsDiv>
    </>
  )
}

export default Start

const Preamble = styled.h2`
  font-size: 32px;
  line-height: 156%;
  color: #000000;
  text-align: center;
`

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  margin: 10px;
  width: 220px;
  height: 68px;
  background: #363636;
  border: none;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
`
