import { useContext } from "react"

import { GameContext } from "../../../game/context"
import { GuessState } from "../../../game/types"

const useGuessOneLetter = () => {
  const { state, dispatch } = useContext(GameContext)

  const guessOneLetter = (guessedLetter: string) => {
    let guessState: GuessState

    if (state.randomWord.includes(guessedLetter)) {
      guessState = GuessState.Correct
    } else {
      guessState = GuessState.Wrong
    }

    dispatch({
      type: "GUESS_ONE_LETTER",
      payload: { letter: guessedLetter, guessState },
    })
  }

  return { guessOneLetter }
}

export default useGuessOneLetter
