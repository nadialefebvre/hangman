import { useContext } from "react"

import { GameContext } from "../game/context"
import { GuessStatus } from "../game/types"
import { stringWithoutDiacritics } from "../utils/stringWithoutDiacritics"

const useGuessOneLetter = () => {
  const { state, dispatch } = useContext(GameContext)

  const guessOneLetter = (guessedLetter: string) => {
    let guessStatus: GuessStatus
    if (
      stringWithoutDiacritics(state.randomWord, state.language).includes(
        guessedLetter
      )
    ) {
      guessStatus = GuessStatus.Correct
    } else {
      guessStatus = GuessStatus.Wrong
    }

    dispatch({
      type: "GUESS_ONE_LETTER",
      payload: { character: guessedLetter, guessStatus },
    })
  }
  return { guessOneLetter }
}

export default useGuessOneLetter
