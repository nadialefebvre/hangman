enum GuessStatus {
  Pending = "PENDING",
  Correct = "CORRECT",
  Wrong = "WRONG",
}

interface Letter {
  character: string
  guessStatus: GuessStatus
}

type GameState = {
  language: string
  phase: "START" | "PLAY" | "RESULT"
  randomWord: string
  alphabet: Letter[]
  result: "PENDING" | "WIN" | "LOSE"
}

type GameAction =
  | {
      type: "UPDATE_PHASE"
      payload: GameState["phase"]
    }
  | {
      type: "UPDATE_RESULT"
      payload: GameState["result"]
    }
  | {
      type: "SET_RANDOM_WORD"
      payload: GameState["randomWord"]
    }
  | { type: "RESET_GAME" }
  | { type: "GUESS_ONE_LETTER"; payload: Letter }

export { GuessStatus }
export type { GameAction, GameState, Letter }
