import React, { useCallback, useContext, useEffect, useState } from "react"
import { useIntl } from "react-intl"

import { GameContext } from "../../game/context"
import { GuessStatus, Letter } from "../../game/types"
import useHandleKeyDown from "../../hooks/useHandleKeyDown"
import useSetDocumentTitle from "../../hooks/useSetDocumentTitle"
import { stringWithoutDiacritics } from "../../utils/stringWithoutDiacritics"
import AlertModal from "../AlertModal"
import Counter from "./Counter"
import LetterButtonsContainer from "./LetterButtonsContainer"
import Word from "./Word"
import messages from "./messages"

const Play: React.FC = () => {
  const { formatMessage } = useIntl()
  const { state, dispatch } = useContext(GameContext)
  const { language, randomWord, alphabet } = state
  const [modalMessage, setModalMessage] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)

  const displayModal = (message: string) => {
    setModalMessage(message)
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setIsModalVisible(false)
  }

  const { handleKeyDown } = useHandleKeyDown(displayModal)

  useSetDocumentTitle(formatMessage(messages.playMessage))

  const word: string = stringWithoutDiacritics(randomWord, language)
  const wrongGuessesCount: number = alphabet.filter(
    (letter: Letter) => letter.guessStatus === GuessStatus.Wrong
  ).length
  const leftTriesCount: number = 8 - wrongGuessesCount

  const isGameWon = useCallback((): boolean => {
    return word
      .split("")
      .every((wordLetter) =>
        alphabet.find(
          (letter) =>
            letter.character === wordLetter &&
            letter.guessStatus === GuessStatus.Correct
        )
      )
  }, [alphabet, word])

  const isGameLost: boolean = leftTriesCount === 0

  useEffect(() => {
    // issue without timeout: should be solved now
    if (isGameWon() || isGameLost) {
      const result = isGameWon() ? "WIN" : "LOSE"
      dispatch({ type: "UPDATE_RESULT", payload: result })

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

    const handleKeyDownListener = (e: KeyboardEvent) => handleKeyDown(e)

    if (!isGameLost && !isGameWon() && !isModalVisible) {
      window.addEventListener("keydown", handleKeyDownListener)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDownListener)
    }
  })

  return (
    <>
      <Counter leftTriesCount={leftTriesCount} />
      <LetterButtonsContainer />
      <Word />
      {isModalVisible && (
        <AlertModal message={modalMessage} onHideModal={hideModal} />
      )}
    </>
  )
}

export default Play
