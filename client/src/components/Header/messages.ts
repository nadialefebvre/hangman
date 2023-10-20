import { defineMessages } from "react-intl"

const scope = "components.Header"

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: "Hangman!",
  },
  restartButton: {
    id: `${scope}.restartButton`,
    defaultMessage: "Restart",
  },
})
