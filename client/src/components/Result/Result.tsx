import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import { GameContext } from "../../game/context"
import { useSetDocumentTitle } from "../../hooks/useSetDocumentTitle"
import ConfettisAnimation from "./ConfettisAnimation"
import messages from "./messages"

const Result: React.FC = () => {
  const { state } = useContext(GameContext)
  const { formatMessage } = useIntl()

  let message: string = ""
  if (state.result === "WIN") {
    message = formatMessage(messages.winMessage)
  } else if (state.result === "LOSE") {
    message = formatMessage(messages.loseMessage)
  }
  useSetDocumentTitle(message)

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
