import React from "react"
import styled from "styled-components/macro"

import { useIntl } from "react-intl"
import messages from "./messages"

interface CounterProps {
  remainingAttempts: number
}

const Counter: React.FC<CounterProps> = ({ remainingAttempts }) => {
  const { formatMessage } = useIntl()

  return (
    <TextCounter>
      {remainingAttempts < 2
        ? formatMessage(messages.counterSingular, { remainingAttempts })
        : formatMessage(messages.counterPlural, { remainingAttempts })}
    </TextCounter>
  )
}

export default Counter

const TextCounter = styled.div`
  text-align: center;
  font-size: 32px;
`
