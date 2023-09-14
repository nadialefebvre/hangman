import React, { useContext, useEffect } from "react"

import RestartButton from "../../components/common/RestartButton"
import { GameContext } from "../../game/context"
import { GuessState, LetterItem } from "../../game/types"
import Counter from "./components/Counter"
import LetterButtonsContainer from "./components/LetterButtonsContainer"
import Word from "./components/Word"
import useHandleKeyDown from "./hooks/usehandleKeyDown"

const Play: React.FC = () => {
  const { state, dispatch } = useContext(GameContext)

  const { handleKeyDown } = useHandleKeyDown()

  const word: string = state.randomWord

  const letters: LetterItem[] = state.letters

  const badGuesses: LetterItem[] = letters.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )
  const remainingGuessesCount: number = 8 - badGuesses.length

  const isGameLost: boolean = remainingGuessesCount === 0

  const isGameWon = (): boolean => {
    return word.split("").every((wordLetter) => {
      return letters.find(
        (letter) =>
          letter.letter === wordLetter &&
          letter.guessState === GuessState.Correct
      )
    })
  }

  if (isGameLost) {
    setTimeout(() => {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "Lose" })
    }, 3000)
  }

  if (isGameWon()) {
    setTimeout(() => {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "Win" })
    }, 3000)
  }

  useEffect(() => {
    if (!isGameLost && !isGameWon()) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  return (
    <>
      <Counter />
      <LetterButtonsContainer isEndOfGame={isGameLost || isGameWon()} />
      <Word />
      <RestartButton />
    </>
  )
}

export default Play
