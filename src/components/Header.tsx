import React from "react"

import styled from "styled-components/macro"
import { v4 as uuidv4 } from "uuid"

interface Props {
  test: number
}

const Header: React.FC<Props> = ({ test }) => {
  const title = Array.from("hangman!")

  return (
    <header>
      <Title>
        {title.map((item, index) => (
          <span key={uuidv4()} className={index + 1 <= test ? "has-color" : ""}>
            {item}
          </span>
        ))}
      </Title>
    </header>
  )
}

export default Header

const Title = styled.h1`
  font-family: "Press Start 2P", cursive;
  font-size: 96px;
  line-height: 96px;
  text-align: center;
  text-transform: uppercase;
`
