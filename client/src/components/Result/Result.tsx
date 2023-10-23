import React, { useContext, useEffect } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components/macro"

import { GameContext } from "../../game/context"
import useHandleKeyDown from "../../hooks/useHandleKeyDown"
import useSetDocumentTitle from "../../hooks/useSetDocumentTitle"
import ConfettisAnimation from "./ConfettisAnimation"
import messages from "./messages"

const Result: React.FC = () => {
  const { state } = useContext(GameContext)
  const { randomWord, result } = state
  const { formatMessage } = useIntl()
  const { handleKeyDown } = useHandleKeyDown()

  useSetDocumentTitle(
    result === "WIN"
      ? formatMessage(messages.winMessage)
      : formatMessage(messages.loseMessage)
  )

  useEffect(() => {
    const handleKeyDownListener = (e: KeyboardEvent) => handleKeyDown(e)

    window.addEventListener("keydown", handleKeyDownListener)

    return () => {
      window.removeEventListener("keydown", handleKeyDownListener)
    }
  }, [handleKeyDown])

  return (
    <>
      {result === "WIN" && <ConfettisAnimation />}
      <StyledText>
        {formatMessage(
          messages[result === "WIN" ? "winMessage" : "loseMessage"]
        )}
      </StyledText>
      <StyledText>
        {formatMessage(messages.wordMessage, {
          word: <StyledTextBig>{randomWord.toUpperCase()}</StyledTextBig>,
        })}
      </StyledText>
    </>
  )
}

export default Result

const StyledText = styled.p`
  font-size: 32px;
`

const StyledTextBig = styled.span`
  font-size: 48px;
`
