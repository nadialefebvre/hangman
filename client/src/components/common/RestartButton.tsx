import React, { useContext } from "react"
import { useIntl } from "react-intl"

import { GameContext } from "../../game/context"
import messages from "../../messages"
import Button from "./Button"

const RestartButton: React.FC = () => {
  const { dispatch } = useContext(GameContext)

  const { formatMessage } = useIntl()

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
