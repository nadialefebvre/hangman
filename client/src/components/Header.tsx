import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import { GameContext } from "../game/context"
import messages from "../messages"

interface Props {
  wrongGuessesCount: number
}

const Header: React.FC<Props> = ({ wrongGuessesCount }) => {
  const { state } = useContext(GameContext)
  const { formatMessage } = useIntl()

  return (
    <header>
      <Title
        stop={state.gamePhase === "Play" ? (wrongGuessesCount / 8) * 100 : 0}
      >
        {formatMessage(messages.title)}
      </Title>
    </header>
  )
}

export default Header

const Title = styled.h1<{ stop?: number | undefined }>`
  font-family: "Press Start 2P", cursive;
  font-size: 96px;
  line-height: 96px;
  text-align: center;
  text-transform: uppercase;
  margin: auto auto;
  width: fit-content;
  background-image: linear-gradient(
    to right,
    red ${({ stop }) => stop}%,
    black ${({ stop }) => stop}%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`
