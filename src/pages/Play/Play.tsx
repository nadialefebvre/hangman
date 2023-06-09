import React, { useEffect, useContext } from "react"

import RestartButton from "../../components/common/RestartButton"
import { GameContext } from "../../game/context"

import { GuessState, LetterItem } from "../../game/types"
import Counter from "./components/Counter"

import LetterButtonsContainer from "./components/LetterButtonsContainer"
import Word from "./components/Word"

import useHandleKeyDown from "./hooks/usehandleKeyDown"

const Play: React.FC = () => {
  const { handleKeyDown } = useHandleKeyDown()
  const { state, dispatch } = useContext(GameContext)

  const word: string = state.randomWord
  const letters: LetterItem[] = state.letters

  const badGuesses: LetterItem[] = letters.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )
  const remainingGuessesCount: number = 8 - badGuesses.length

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  const isGameLost: boolean = remainingGuessesCount === 0

  if (isGameLost) {
    // need to block all buttons and prevent to press any key
    setTimeout(() => {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "Lose" })
    }, 3000)
  }

  const isGameWon = (): boolean => {
    return word.split("").every((letter) => {
      const letterIndex: number = letter.charCodeAt(0) - 97
      return letters[letterIndex].guessState === GuessState.Correct
    })
  }

  if (isGameWon()) {
    // need to block all buttons and prevent to press any key
    setTimeout(() => {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "Win" })
    }, 3000)
  }

  return (
    <>
      <Counter />
      <LetterButtonsContainer />
      <Word />
      <RestartButton />
    </>
  )
}

export default Play
