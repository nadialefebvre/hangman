import { useContext } from "react"
import { useIntl } from "react-intl"

import { GameContext } from "../game/context"
import { GuessStatus, Letter } from "../game/types"
import messages from "../messages"
import useGuessOneLetter from "./useGuessOneLetter"

const useHandleKeyDown = (displayModal?: any) => {
  const { state, dispatch } = useContext(GameContext)
  const { language, phase, alphabet } = state
  const { formatMessage } = useIntl()
  const { guessOneLetter } = useGuessOneLetter()

  const endOfAlphabet: string =
    alphabet[alphabet.length - 1].character.toUpperCase()

  const isLetter = (key: string): boolean =>
    language === "sv" ? /^[a-zåöä]$/.test(key) : /^[a-z]$/.test(key)

  const isRestartKeyPressed = (key: string): boolean => key === "escape"

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase()

    const letterIndex = alphabet.findIndex(
      (letter: Letter) => letter.character === key
    )

    if (isRestartKeyPressed(key)) {
      dispatch({ type: "RESET_GAME" })
    } else if (phase === "PLAY") {
      if (isLetter(key)) {
        const currentLetter = alphabet[letterIndex]
        const isCorrect = currentLetter.guessStatus === GuessStatus.Correct
        const isWrong = currentLetter.guessStatus === GuessStatus.Wrong

        if (isCorrect) {
          displayModal(
            formatMessage(messages.alertCorrectGuess, {
              letter: key.toUpperCase(),
            })
          )
        } else if (isWrong) {
          displayModal(
            formatMessage(messages.alertWrongGuess, {
              letter: key.toUpperCase(),
            })
          )
        } else {
          guessOneLetter(key)
        }
      } else if (key.length === 1) {
        displayModal(formatMessage(messages.alertNotALetter, { endOfAlphabet }))
      }
    }
  }

  return { handleKeyDown }
}

export default useHandleKeyDown
