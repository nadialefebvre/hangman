import React from "react"
import styled from "styled-components/macro"

import { useIntl } from "react-intl"
import messages from "./messages"

interface CounterProps {
  leftTriesCount: number
}

const Counter: React.FC<CounterProps> = ({ leftTriesCount }) => {
  const { formatMessage } = useIntl()

  return (
    <TextCounter>
      {leftTriesCount < 2
        ? formatMessage(messages.counterSingular, { leftTriesCount })
        : formatMessage(messages.counterPlural, { leftTriesCount })}
    </TextCounter>
  )
}

export default Counter

const TextCounter = styled.div`
  text-align: center;
  font-size: 32px;
`
