import { defineMessages } from "react-intl"

const scope = "components.Play"

export default defineMessages({
  playMessage: {
    id: `${scope}.playMessage`,
    defaultMessage: "Game in progress",
  },
  counterPlural: {
    id: `${scope}.counterPlural`,
    defaultMessage: "{leftTriesCount} tries left",
  },
  counterSingular: {
    id: `${scope}.counterSingular`,
    defaultMessage: "{leftTriesCount} try left",
  },
})
