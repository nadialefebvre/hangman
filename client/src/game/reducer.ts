import { Reducer } from "react"
import { GameAction, GameState, GuessState } from "./types"

const userLanguage = navigator.language.split("-")[0]

const alphabetLength = userLanguage === "sv" ? 29 : 26

const initialState: GameState = {
  language: userLanguage,
  gamePhase: "Start",
  randomWord: "",
  alphabet: [...Array(alphabetLength)].map((_, i) => ({
    letter: i < 26 ? String.fromCharCode(i + 97) : ["å", "ä", "ö"][i - 26],
    guessState: GuessState.Pending,
  })),
}

const gameReducer: Reducer<GameState, GameAction> = (
  state: GameState,
  action: GameAction
) => {
  switch (action.type) {
    case "UPDATE_GAME_PHASE":
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
        alphabet: state.alphabet.map((item) =>
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
