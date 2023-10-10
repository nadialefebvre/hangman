import React from "react"
import styled from "styled-components"

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <h2>Made by me</h2>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 40px;
  left: 60px;
`
