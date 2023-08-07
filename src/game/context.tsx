import React, { Dispatch, createContext, useReducer } from "react"

import { gameReducer, initialState } from "./reducer"
import { GameAction, GameState } from "./types"

type GameContextValue = {
  state: GameState
  dispatch: Dispatch<GameAction>
}

const GameContext = createContext<GameContextValue>({
  state: initialState,
  dispatch: () => {},
})

interface GameProviderProps {
  children: React.ReactNode
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }
