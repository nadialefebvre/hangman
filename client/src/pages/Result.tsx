import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import { GameContext } from "../game/context"
import messages from "../messages"
import ConfettisAnimation from "./ConfettisAnimation"

const Result: React.FC = () => {
  const { state } = useContext(GameContext)
  const { formatMessage } = useIntl()

  if (state.result === "WIN") {
    document.title =
      formatMessage(messages.title) + " — " + formatMessage(messages.winMessage)
  } else if (state.result === "LOSE") {
    document.title =
      formatMessage(messages.title) +
      " — " +
      formatMessage(messages.loseMessage)
  }

  return (
    <>
      {state.result === "WIN" && <ConfettisAnimation />}
      {state.result === "WIN" ? (
        <StyledText>{formatMessage(messages.winMessage)}</StyledText>
      ) : (
        <StyledText>{formatMessage(messages.loseMessage)}</StyledText>
      )}
      <StyledText>
        {formatMessage(messages.wordMessage, {
          word: <StyledTextBig>{state.randomWord.toUpperCase()}</StyledTextBig>,
        })}
      </StyledText>
    </>
  )
}

export default Result

const StyledText = styled.p`
  font-size: 32px;
`

const StyledTextBig = styled.span`
  font-size: 48px;
`
