import React, { useContext } from "react"
import styled from "styled-components/macro"

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
        {title.map((item, i) => (
          <span
            key={`${i}${item}`}
            className={
              i + 1 <= badGuessesCount && state.gamePhase === "Play"
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
