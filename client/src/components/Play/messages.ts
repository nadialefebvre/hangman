import { defineMessages } from "react-intl"

const scope = "components.Play"

export default defineMessages({
  playMessage: {
    id: `${scope}.playMessage`,
    defaultMessage: "Game in progress",
  },
  counterPlural: {
    id: `${scope}.counterPlural`,
    defaultMessage: "{remainingAttemptsCount} attempts left",
  },
  counterSingular: {
    id: `${scope}.counterSingular`,
    defaultMessage: "{remainingAttemptsCount} attempt left",
  },
})
