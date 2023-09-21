import { defineMessages } from "react-intl"

const globalScope = "app.global"
const startScope = "app.start"
const playScope = "app.play"
const winScope = "app.win"
const loseScope = "app.lose"

export default defineMessages({
  restartButton: {
    id: `${globalScope}.restartButton`,
    defaultMessage: "Restart",
  },
  wordMessage: {
    id: `${globalScope}.wordMessage`,
    defaultMessage: "The word was ",
  },

  instructions: {
    id: `${startScope}.instructions`,
    defaultMessage: "Choose a category or get a random word",
  },
  // word types??

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
})
