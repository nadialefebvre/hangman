import { useContext } from "react"

import { GameContext } from "../../../game/context"
import { GuessState } from "../../../game/types"
import { stringWithoutDiacritics } from "../../../utils/stringWithoutDiacritics"

const useGuessOneLetter = () => {
  const { state, dispatch } = useContext(GameContext)

  const guessOneLetter = (guessedLetter: string) => {
    let guessState: GuessState
    if (
      stringWithoutDiacritics(state.randomWord, state.language).includes(
        guessedLetter
      )
    ) {
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
