import React from "react"

import styled from "styled-components/macro"

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}
const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default Button

const StyledButton = styled.button`
  margin: 10px;
  width: 220px;
  height: 68px;
  background: #363636;
  border: none;
  font-family: "Press Start 2P", cursive;
  font-size: 20px;
  line-height: 20px;

  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
`
