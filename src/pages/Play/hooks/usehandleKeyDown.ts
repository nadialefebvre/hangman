import { useContext } from "react"

import { GameContext } from "../../../game/context"
import { GuessState, LetterItem } from "../../../game/types"
import useGuessOneLetter from "./useGuessOneLetter"

const useHandleKeyDown = () => {
  const { guessOneLetter } = useGuessOneLetter()

  const { state, dispatch } = useContext(GameContext)
  const letters: LetterItem[] = state.letters

  const isLetter = (key: string): boolean => /^[a-zåöä]$/.test(key)
  const isRestartKeyPressed = (key: string): boolean =>
    key === "enter" || key === "escape"

  const handleKeyDown = (event: KeyboardEvent) => {
    const key: string = event.key.toLowerCase()
    const letterIndex: number = letters.findIndex(
      (item: LetterItem) => item.letter === key
    )

    if (isLetter(key)) {
      if (letters[letterIndex].guessState === GuessState.Correct) {
        alert(
          `You already made a GOOD guess on the letter ${key.toUpperCase()}.`
        )
      } else if (letters[letterIndex].guessState === GuessState.Wrong) {
        alert(
          `You already made a BAD guess on the letter ${key.toUpperCase()}.`
        )
      } else {
        guessOneLetter(key)
      }
    } else if (isRestartKeyPressed(key)) {
      dispatch({ type: "RESET_GAME" })
    } else if (key.length === 1) {
      alert("Only letters are allowed. Press ENTER or ESC to escape the game")
    }
  }

  return { handleKeyDown }
}

export default useHandleKeyDown
