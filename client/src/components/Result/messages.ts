import { defineMessages } from "react-intl"

const scope = "components.Result"

export default defineMessages({
  loseMessage: {
    id: `${scope}.loseMessage`,
    defaultMessage: "You lost!",
  },
  winMessage: {
    id: `${scope}.winMessage`,
    defaultMessage: "You won!",
  },
  wordMessage: {
    id: `${scope}.wordMessage`,
    defaultMessage: "The word was {word}",
  },
})
