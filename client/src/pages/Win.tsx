import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import { GameContext } from "../game/context"
import messages from "../messages"
import ConfettisAnimation from "./ConfettisAnimation"

const Win: React.FC = () => {
  const { state } = useContext(GameContext)
  const { formatMessage } = useIntl()

  document.title =
    formatMessage(messages.title) + " — " + formatMessage(messages.winMessage)

  return (
    <>
      <ConfettisAnimation />
      <StyledText>{formatMessage(messages.winMessage)}</StyledText>
      <StyledText>
        {formatMessage(messages.wordMessage, {
          word: <StyledTextBig>{state.randomWord.toUpperCase()}</StyledTextBig>,
        })}
      </StyledText>
    </>
  )
}

export default Win

const StyledText = styled.p`
  font-size: 32px;
`

const StyledTextBig = styled.span`
  font-size: 48px;
`
