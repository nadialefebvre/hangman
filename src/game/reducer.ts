import { Reducer } from "react"
import { GameAction, GameState, GuessState } from "./types"

const arrayLength = navigator.language.split("-")[0] === "sv" ? 29 : 26

const initialState: GameState = {
  language: navigator.language.split("-")[0],
  gamePhase: "Start",
  randomWord: "",
  letters: [...Array(arrayLength)].map((_, i) => ({
    letter: i < 26 ? String.fromCharCode(i + 97) : ["å", "ä", "ö"][i - 26],
    guessState: GuessState.Untouched,
  })),
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

export { gameReducer, initialState }
