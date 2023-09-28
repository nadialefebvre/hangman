import { defineMessages } from "react-intl"

const headerScope = "app.Header"
const restartButtonScope = "app.RestartButton"
const startScope = "app.Start"
const playScope = "app.Play"
const winScope = "app.Win"
const loseScope = "app.Lose"
const winOrLoseScope = "app.WinOrLose"

export default defineMessages({
  title: {
    id: `${headerScope}.title`,
    defaultMessage: "hangman!",
  },

  restartButton: {
    id: `${restartButtonScope}.restartButton`,
    defaultMessage: "Restart",
  },

  wordMessage: {
    id: `${winOrLoseScope}.wordMessage`,
    defaultMessage: "The word was ",
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

  counterPlural: {
    id: `${playScope}.counterPlural`,
    defaultMessage: " attempts left",
  },
  counterSingular: {
    id: `${playScope}.counterSingular`,
    defaultMessage: " attempt left",
  },

  winMessage: {
    id: `${winScope}.winMessage`,
    defaultMessage: "You WON!",
  },

  loseMessage: {
    id: `${loseScope}.loseMessage`,
    defaultMessage: "You LOST!",
  },

  alertNotALetter: {
    id: "app.alertNotALetter",
    defaultMessage: "Only letters from A to {endOfAlphabet} are allowed.",
  },
  alertGoodGuess: {
    id: "app.alertGoodGuess",
    defaultMessage: "You already made a GOOD guess on the letter {letter}.",
  },
  alertBadGuess: {
    id: "app.alertBadGuess",
    defaultMessage: "You already made a BAD guess on the letter {letter}.",
  },
})
