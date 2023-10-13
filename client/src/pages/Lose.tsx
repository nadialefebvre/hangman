import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import { GameContext } from "../game/context"
import messages from "../messages"

const Lose: React.FC = () => {
  const { formatMessage } = useIntl()
  const { state } = useContext(GameContext)

  const favicon = document.getElementById("favicon")
  if (favicon instanceof HTMLLinkElement) {
    favicon.href = "favicon-lose.svg"
  }

  document.title =
    formatMessage(messages.title) + " — " + formatMessage(messages.loseMessage)

  return (
    <>
      <StyledText>{formatMessage(messages.loseMessage)}</StyledText>
      <StyledText>
        {formatMessage(messages.wordMessage, {
          word: <StyledTextBig>{state.randomWord.toUpperCase()}</StyledTextBig>,
        })}
      </StyledText>
    </>
  )
}

export default Lose

const StyledText = styled.p`
  font-size: 32px;
`

const StyledTextBig = styled.span`
  font-size: 48px;
`
