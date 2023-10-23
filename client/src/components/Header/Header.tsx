import React, { useContext } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import { GameContext } from "../../game/context"
import messages from "./messages"

interface Props {
  wrongCount: number
}

const Header: React.FC<Props> = ({ wrongCount }) => {
  const { state, dispatch } = useContext(GameContext)
  const { phase } = state
  const { formatMessage } = useIntl()

  const onRestart = (): void => {
    dispatch({ type: "RESET_GAME" })
  }

  return (
    <header>
      {phase !== "START" && (
        <RestartIcon
          src="./assets/restart.svg"
          alt={formatMessage(messages.restartButton)}
          width={50}
          onClick={onRestart}
        />
      )}
      <Title stop={phase === "PLAY" ? (wrongCount / 8) * 100 : 0}>
        {formatMessage(messages.title)}
      </Title>
    </header>
  )
}

export default Header

const RestartIcon = styled.img`
  position: absolute;
  top: 50px;
  right: 50px;
  cursor: pointer;
`

const Title = styled.h1<{ stop?: number | undefined }>`
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
