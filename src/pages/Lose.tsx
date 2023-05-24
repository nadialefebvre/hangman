import React, { useContext } from "react"

import styled from "styled-components/macro"

import RestartButton from "../components/common/RestartButton"

import { GameContext } from "../game/context"

const Lose: React.FC = () => {
  const { state } = useContext(GameContext)

  return (
    <>
      <StyledText>You LOST!</StyledText>
      <StyledText>
        The word was{" "}
        <StyledTextRedBig>{state.randomWord.toUpperCase()}</StyledTextRedBig>
      </StyledText>

      <RestartButton />
    </>
  )
}

export default Lose

const StyledText = styled.p`
  font-family: "Press Start 2P";
  font-size: 32px;
`

const StyledTextRedBig = styled.span`
  font-size: 48px;
`
