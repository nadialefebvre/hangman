import { Reducer } from "react"
import { GameState, GuessState, GameAction } from "./types"

const initialState: GameState = {
  gamePhase: "Start",
  randomWord: "",
  letters: [...Array(26)].map((_, i) => ({
    letter: String.fromCharCode(i + 97),
    guessState: GuessState.Untouched,
  })),
  // letters: [...Array(29)].map((_, i) => ({
  //   letter: i < 26 ? String.fromCharCode(i + 97) : ["å", "ä", "ö"][i - 26],
  //   guessState: GuessState.Untouched,
  // })),
}

const gameReducer: Reducer<GameState, GameAction> = (
  state: GameState,
  action: GameAction
) => {
  switch (action.type) {
    case "UPDATE_GAME_STATE":
      return {
        ...state,
        gamePhase: action.payload,
      }
    case "RESET_GAME":
      return initialState
    case "SET_RANDOM_WORD":
      return {
        ...state,
        randomWord: action.payload,
      }
    case "GUESS_ONE_LETTER":
      const guessedLetter: string = action.payload.letter
      const guessedLetterState: GuessState = action.payload.guessState
      return {
        ...state,
        letters: state.letters.map((item) =>
          item.letter === guessedLetter
            ? { ...item, guessState: guessedLetterState }
            : item
        ),
      }
    default:
      return state
  }
}

export { initialState, gameReducer }
