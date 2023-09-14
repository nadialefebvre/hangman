import React, { useContext } from "react"
import styled from "styled-components/macro"
import { v4 as uuidv4 } from "uuid"

import { GameContext } from "../game/context"

interface Props {
  badGuessesCount: number
}

const Header: React.FC<Props> = ({ badGuessesCount }) => {
  const { state } = useContext(GameContext)

  const title = Array.from("hangman!")

  return (
    <header>
      <Title>
        {title.map((item, index) => (
          <span
            key={uuidv4()}
            className={
              index + 1 <= badGuessesCount && state.gamePhase === "Play"
                ? "has-color"
                : ""
            }
          >
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
