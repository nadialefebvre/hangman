import React, { useContext } from "react"

import styled from "styled-components/macro"

import RestartButton from "../components/common/RestartButton"

import { GameContext } from "../game/context"

const Win: React.FC = () => {
  const { state } = useContext(GameContext)

  return (
    <>
      <StyledTextGreen>You WON!</StyledTextGreen>
      <StyledText>
        The word was{" "}
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
