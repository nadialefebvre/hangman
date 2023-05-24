import React, { useContext } from "react"

import { GameContext } from "../../game/context"
import Button from "./Button"

const RestartButton: React.FC = () => {
  const { dispatch } = useContext(GameContext)

  const handleRestart = (): void => {
    dispatch({ type: "RESET_GAME" })
  }

  return <Button onClick={handleRestart}>Restart</Button>
}

export default RestartButton
