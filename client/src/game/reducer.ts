import { Reducer } from "react"
import { GameAction, GameState, GuessStatus } from "./types"

const userLanguage = navigator.language.split("-")[0]

const alphabetLength = userLanguage === "sv" ? 29 : 26

const initialState: GameState = {
  language: userLanguage,
  phase: "START",
  randomWord: "",
  alphabet: [...Array(alphabetLength)].map((_, i) => ({
    character: i < 26 ? String.fromCharCode(i + 97) : ["å", "ä", "ö"][i - 26],
    guessStatus: GuessStatus.Pending,
  })),
  result: "PENDING",
}

const gameReducer: Reducer<GameState, GameAction> = (
  state: GameState,
  action: GameAction
) => {
  switch (action.type) {
    case "UPDATE_PHASE":
      return {
        ...state,
        phase: action.payload,
      }
    case "SET_RANDOM_WORD":
      return {
        ...state,
        randomWord: action.payload,
      }
    case "GUESS_ONE_LETTER":
      return {
        ...state,
        alphabet: state.alphabet.map((letter) =>
          letter.character === action.payload.character
            ? { ...letter, guessStatus: action.payload.guessStatus }
            : letter
        ),
      }
    case "UPDATE_RESULT":
      return {
        ...state,
        result: action.payload,
      }
    case "RESET_GAME":
      return initialState
    default:
      return state
  }
}

export { gameReducer, initialState }
