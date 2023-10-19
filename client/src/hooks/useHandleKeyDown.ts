import { useContext } from "react"
import { useIntl } from "react-intl"

import { GameContext } from "../game/context"
import { GuessStatus, Letter } from "../game/types"
import messages from "../messages"
import useGuessOneLetter from "./useGuessOneLetter"

const useHandleKeyDown = () => {
  const { state, dispatch } = useContext(GameContext)
  const { formatMessage } = useIntl()

  const { guessOneLetter } = useGuessOneLetter()

  const alphabet: Letter[] = state.alphabet

  const endOfAlphabet: string =
    alphabet[alphabet.length - 1].character.toUpperCase()

  const isLetter = (key: string): boolean =>
    state.language === "sv" ? /^[a-zåöä]$/.test(key) : /^[a-z]$/.test(key)

  const isRestartKeyPressed = (key: string): boolean =>
    key === "enter" || key === "escape"

  const handleKeyDown = (event: KeyboardEvent) => {
    const key: string = event.key.toLowerCase()

    const letterIndex: number = alphabet.findIndex(
      (letter: Letter) => letter.character === key
    )

    if (isLetter(key)) {
      if (alphabet[letterIndex].guessStatus === GuessStatus.Correct) {
        alert(
          formatMessage(messages.alertCorrectGuess, {
            letter: key.toUpperCase(),
          })
        )
      } else if (alphabet[letterIndex].guessStatus === GuessStatus.Wrong) {
        alert(
          formatMessage(messages.alertWrongGuess, { letter: key.toUpperCase() })
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
