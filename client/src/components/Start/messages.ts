import { defineMessages } from "react-intl"

const scope = "components.Start"

export default defineMessages({
  startMessage: {
    id: `${scope}.startMessage`,
    defaultMessage: "Make your choice",
  },
  instructions: {
    id: `${scope}.instructions`,
    defaultMessage: "Choose a category or get a random word",
  },
  noun: {
    id: `${scope}.noun`,
    defaultMessage: "noun",
  },
  verb: {
    id: `${scope}.verb`,
    defaultMessage: "verb",
  },
  adjective: {
    id: `${scope}.adjective`,
    defaultMessage: "adjective",
  },
  adverb: {
    id: `${scope}.adverb`,
    defaultMessage: "adverb",
  },
  random: {
    id: `${scope}.random`,
    defaultMessage: "random",
  },
})
