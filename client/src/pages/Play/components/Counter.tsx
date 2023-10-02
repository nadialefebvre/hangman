import React from "react"
import styled from "styled-components/macro"

import { useIntl } from "react-intl"
import messages from "../../../messages"

interface CounterProps {
  remainingAttemptsCount: number
}

const Counter: React.FC<CounterProps> = ({ remainingAttemptsCount }) => {
  const { formatMessage } = useIntl()

  return (
    <TextCounter>
      {remainingAttemptsCount < 2
        ? formatMessage(messages.counterSingular, { remainingAttemptsCount })
        : formatMessage(messages.counterPlural, { remainingAttemptsCount })}
    </TextCounter>
  )
}

export default Counter

const TextCounter = styled.div`
  font-family: "Press Start 2P";
  font-size: 32px;
`
