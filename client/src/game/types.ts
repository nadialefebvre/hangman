enum GuessState {
  Untouched = "UNTOUCHED",
  Correct = "CORRECT",
  Wrong = "WRONG",
}

interface LetterItem {
  letter: string
  guessState: GuessState
}

type GameState = {
  language: string
  gamePhase: "Start" | "Play" | "Win" | "Lose"
  randomWord: string
  alphabet: LetterItem[]
}

type GameAction =
  | {
      type: "UPDATE_GAME_STATE"
      payload: GameState["gamePhase"]
    }
  | {
      type: "SET_RANDOM_WORD"
      payload: GameState["randomWord"]
    }
  | { type: "RESET_GAME" }
  | { type: "GUESS_ONE_LETTER"; payload: LetterItem }

export { GuessState }
export type { GameAction, GameState, LetterItem }
