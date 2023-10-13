import { defineMessages } from "react-intl"

const headerScope = "app.Header"
const startScope = "app.Start"
const playScope = "app.Play"
const winScope = "app.Win"
const loseScope = "app.Lose"
const winOrLoseScope = "app.WinOrLose"

export default defineMessages({
  title: {
    id: `${headerScope}.title`,
    defaultMessage: "Hangman!",
  },
  restartButton: {
    id: `${headerScope}.restartButton`,
    defaultMessage: "Restart",
  },

  wordMessage: {
    id: `${winOrLoseScope}.wordMessage`,
    defaultMessage: "The word was {word}",
  },

  startMessage: {
    id: `${startScope}.startMessage`,
    defaultMessage: "Make your choice",
  },
  instructions: {
    id: `${startScope}.instructions`,
    defaultMessage: "Choose a category or get a random word",
  },
  noun: {
    id: `${startScope}.noun`,
    defaultMessage: "noun",
  },
  verb: {
    id: `${startScope}.verb`,
    defaultMessage: "verb",
  },
  adjective: {
    id: `${startScope}.adjective`,
    defaultMessage: "adjective",
  },
  adverb: {
    id: `${startScope}.adverb`,
    defaultMessage: "adverb",
  },
  random: {
    id: `${startScope}.random`,
    defaultMessage: "random",
  },

  playMessage: {
    id: `${playScope}.playMessage`,
    defaultMessage: "Game in progress",
  },
  counterPlural: {
    id: `${playScope}.counterPlural`,
    defaultMessage: "{remainingAttemptsCount} attempts left",
  },
  counterSingular: {
    id: `${playScope}.counterSingular`,
    defaultMessage: "{remainingAttemptsCount} attempt left",
  },

  winMessage: {
    id: `${winScope}.winMessage`,
    defaultMessage: "You won!",
  },

  loseMessage: {
    id: `${loseScope}.loseMessage`,
    defaultMessage: "You lost!",
  },

  alertNotALetter: {
    id: "app.alertNotALetter",
    defaultMessage: "Only letters from A to {endOfAlphabet} are allowed.",
  },
  alertCorrectGuess: {
    id: "app.alertCorrectGuess",
    defaultMessage: "You already made a CORRECT guess on the letter {letter}.",
  },
  alertWrongGuess: {
    id: "app.alertWrongGuess",
    defaultMessage: "You already made a WRONG guess on the letter {letter}.",
  },
})
