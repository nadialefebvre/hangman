import React from "react"
import { useIntl } from "react-intl"
import styled from "styled-components"

import messages from "./messages"

const Footer: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <StyledFooter>
      <h2>{formatMessage(messages.text)}</h2>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 40px;
  left: 60px;
`
