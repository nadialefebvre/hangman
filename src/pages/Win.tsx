import React, { useContext } from "react"

import styled from "styled-components/macro"

import RestartButton from "../components/common/RestartButton"

import { GameContext } from "../game/context"

import { useIntl } from "react-intl"

import messages from "../messages"

const Win: React.FC = () => {
  const { formatMessage } = useIntl()

  const { state } = useContext(GameContext)

  return (
    <>
      <StyledTextGreen>{formatMessage(messages.winMessage)}</StyledTextGreen>
      <StyledText>
        {formatMessage(messages.wordMessage)}
        <StyledTextGreenBig>
          {state.randomWord.toUpperCase()}
        </StyledTextGreenBig>
      </StyledText>
      <RestartButton />
    </>
  )
}

export default Win

const StyledText = styled.p`
  font-family: "Press Start 2P";
  font-size: 32px;
`

const StyledTextGreen = styled(StyledText)`
  color: green;
`

const StyledTextGreenBig = styled.span`
  font-size: 48px;
`
