import React, { useContext, useEffect } from "react"

import RestartButton from "../../components/common/RestartButton"
import { GameContext } from "../../game/context"
import { GuessState, LetterItem } from "../../game/types"
import { stringWithoutDiacritics } from "../../utils/stringWithoutDiacritics"
import Counter from "./components/Counter"
import LetterButtonsContainer from "./components/LetterButtonsContainer"
import Word from "./components/Word"
import useHandleKeyDown from "./hooks/useHandleKeyDown"

const Play: React.FC = () => {
  const { state, dispatch } = useContext(GameContext)

  const { handleKeyDown } = useHandleKeyDown()

  const word: string = stringWithoutDiacritics(state.randomWord, state.language)

  const alphabet: LetterItem[] = state.alphabet

  const badGuesses: LetterItem[] = alphabet.filter(
    (item: LetterItem) => item.guessState === GuessState.Wrong
  )
  const remainingAttemptsCount: number = 8 - badGuesses.length

  const isGameLost: boolean = remainingAttemptsCount === 0

  const isGameWon = (): boolean => {
    return word.split("").every((wordLetter) => {
      return alphabet.find(
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

  // add this to some instructions in Play: "Press ENTER or ESC to escape the game"

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
