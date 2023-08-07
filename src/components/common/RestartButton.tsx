import React, { useContext } from "react"

import { GameContext } from "../../game/context"
import Button from "./Button"

import { useIntl } from "react-intl"

import messages from "../../messages"

const RestartButton: React.FC = () => {
  const { formatMessage } = useIntl()

  const { dispatch } = useContext(GameContext)

  const handleRestart = (): void => {
    dispatch({ type: "RESET_GAME" })
  }

  return (
    <Button onClick={handleRestart}>
      {formatMessage(messages.restartButton)}
    </Button>
  )
}

export default RestartButton
