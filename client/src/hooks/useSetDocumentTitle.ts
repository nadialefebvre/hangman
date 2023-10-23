import { useEffect } from "react"
import { useIntl } from "react-intl"

import messages from "../messages"

export const useSetDocumentTitle = (message: string) => {
  const { formatMessage } = useIntl()

  useEffect(() => {
    document.title = formatMessage(messages.title) + " — " + message
  }, [formatMessage, message])
}

// import { useContext, useEffect } from "react"
// import { useIntl } from "react-intl"

// import { GameContext } from "../game/context"
// import messages from "../messages"

// export const useSetDocumentTitle = () => {
//   const { state } = useContext(GameContext)
//   const { formatMessage } = useIntl()

//   let message: string = ""

//   if (state.phase === "START") {
//     message = formatMessage(messages.subtitleStart)
//   } else if (state.phase === "PLAY") {
//     message = formatMessage(messages.subtitlePlay)
//   } else if (state.phase === "RESULT") {
//     if (state.result === "WIN") {
//       message = formatMessage(messages.subtitleResultWin)
//     } else if (state.result === "LOSE") {
//       message = formatMessage(messages.subtitleResultLose)
//     }
//   }

//   useEffect(() => {
//     document.title = formatMessage(messages.title) + " — " + message
//   }, [formatMessage, message])
// }
