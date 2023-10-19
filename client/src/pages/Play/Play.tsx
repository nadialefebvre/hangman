import React, { useCallback, useContext, useEffect } from "react"
import { useIntl } from "react-intl"

import { GameContext } from "../../game/context"
import { GuessStatus, Letter } from "../../game/types"
import useHandleKeyDown from "../../hooks/useHandleKeyDown"
import messages from "../../messages"
import { stringWithoutDiacritics } from "../../utils/stringWithoutDiacritics"
import Counter from "./components/Counter"
import LetterButtonsContainer from "./components/LetterButtonsContainer"
import Word from "./components/Word"

const Play: React.FC = () => {
  const { formatMessage } = useIntl()
  const { state, dispatch } = useContext(GameContext)
  const { handleKeyDown } = useHandleKeyDown()

  const word: string = stringWithoutDiacritics(state.randomWord, state.language)
  const alphabet: Letter[] = state.alphabet
  const wrongGuesses: Letter[] = alphabet.filter(
    (letter: Letter) => letter.guessStatus === GuessStatus.Wrong
  )
  const remainingAttemptsCount: number = 8 - wrongGuesses.length

  const isGameWon = useCallback((): boolean => {
    return word.split("").every((wordLetter) => {
      return alphabet.find(
        (letter) =>
          letter.character === wordLetter &&
          letter.guessStatus === GuessStatus.Correct
      )
    })
  }, [alphabet, word])

  const isGameLost: boolean = remainingAttemptsCount === 0

  useEffect(() => {
    // issue without timeout: should be solved now
    if (isGameWon() || isGameLost) {
      if (isGameWon()) {
        dispatch({ type: "UPDATE_RESULT", payload: "WIN" })
      } else if (isGameLost) {
        dispatch({ type: "UPDATE_RESULT", payload: "LOSE" })
      }
      setTimeout(() => {
        dispatch({ type: "UPDATE_PHASE", payload: "RESULT" })
      }, 3000)
    }
  }, [isGameLost, isGameWon, dispatch])

  useEffect(() => {
    // Issue only with Firefox
    // After clicking on a letter button, focus stays on button instead of "returning" to body after
    // Then the browser is not listening to keydown eventListener anymore
    // https://stackoverflow.com/questions/6976486/is-there-any-way-in-javascript-to-focus-the-document-content-area
    // The following removes focus from any focused element, solving this issue
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }

    if (!isGameLost && !isGameWon()) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })

  document.title =
    formatMessage(messages.title) + " — " + formatMessage(messages.playMessage)

  // add this to some instructions in Play: "Press ENTER or ESC to escape the game"

  return (
    <>
      <Counter remainingAttemptsCount={remainingAttemptsCount} />
      <LetterButtonsContainer />
      <Word />
    </>
  )
}

export default Play
