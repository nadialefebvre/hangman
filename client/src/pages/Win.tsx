import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import { GameContext } from "../game/context"
import messages from "../messages"

const Win: React.FC = () => {
  const { state } = useContext(GameContext)

  const { formatMessage } = useIntl()

  return (
    <>
      <StyledTextGreen>{formatMessage(messages.winMessage)}</StyledTextGreen>
      <StyledText>
        {formatMessage(messages.wordMessage, {
          word: (
            <StyledTextGreenBig>
              {state.randomWord.toUpperCase()}
            </StyledTextGreenBig>
          ),
        })}
      </StyledText>
    </>
  )
}

export default Win

const StyledText = styled.p`
  font-size: 32px;
`

const StyledTextGreen = styled(StyledText)`
  color: green;
`

const StyledTextGreenBig = styled.span`
  font-size: 48px;
`
