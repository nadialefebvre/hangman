import { useContext } from "react"
import { useIntl } from "react-intl"

import { GameContext } from "../../../game/context"
import { GuessState, LetterItem } from "../../../game/types"
import messages from "../../../messages"
import useGuessOneLetter from "./useGuessOneLetter"

const useHandleKeyDown = () => {
  const { state, dispatch } = useContext(GameContext)
  const { formatMessage } = useIntl()

  const { guessOneLetter } = useGuessOneLetter()

  const letters: LetterItem[] = state.letters

  const endOfAlphabet: string = state.language === "sv" ? "Ö" : "Z"

  const isLetter = (key: string): boolean =>
    state.language === "sv" ? /^[a-zåöä]$/.test(key) : /^[a-z]$/.test(key)

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
          formatMessage(messages.alertGoodGuess, { letter: key.toUpperCase() })
        )
      } else if (letters[letterIndex].guessState === GuessState.Wrong) {
        alert(
          formatMessage(messages.alertBadGuess, { letter: key.toUpperCase() })
        )
      } else {
        guessOneLetter(key)
      }
    } else if (isRestartKeyPressed(key)) {
      dispatch({ type: "RESET_GAME" })
    } else if (key.length === 1) {
      alert(formatMessage(messages.alertNotALetter, { endOfAlphabet }))
    }
  }

  return { handleKeyDown }
}

export default useHandleKeyDown
