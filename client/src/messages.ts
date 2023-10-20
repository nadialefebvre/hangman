import { defineMessages } from "react-intl"

const headerScope = "app.Header"

export default defineMessages({
  // need to fix this one that is used a couple of places...
  title: {
    id: `${headerScope}.title`,
    defaultMessage: "Hangman!",
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
