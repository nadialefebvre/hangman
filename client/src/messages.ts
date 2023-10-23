import { defineMessages } from "react-intl"

const scope = "global"

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: "Hangman",
  },
  // subtitleStart: {
  //   id: `${scope}.subtitleStart`,
  //   defaultMessage: "Make your choice",
  // },
  // subtitlePlay: {
  //   id: `${scope}.subtitlePlay`,
  //   defaultMessage: "Game in progress",
  // },
  // subtitleResultLose: {
  //   id: `${scope}.subtitleResultLose`,
  //   defaultMessage: "Sorry!",
  // },
  // subtitleResultWin: {
  //   id: `${scope}.subtitleResultWin`,
  //   defaultMessage: "Congratulations!",
  // },

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
