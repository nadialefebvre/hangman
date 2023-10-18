import React, { useEffect, useState } from "react"
import styled from "styled-components/macro"

const GRAVITY_ACCELERATION = 0.049
const FRAME_TIME = 0.0167
const CONFETTIS_COUNT = 200
const CONFETTIS_BLAST_TOP = 50
const CONFETTIS_BLAST_LEFT = 50

interface Confetti {
  key: number
  x: number
  y: number
  vX: number
  vY: number
}

const ConfettisAnimation: React.FC = () => {
  const [confettis, setConfettis] = useState<Confetti[]>([])

  const createConfettis = () => {
    return Array.from({ length: CONFETTIS_COUNT }, (_, i) => {
      const randomVelX = (Math.random() - 0.5) * 8
      const randomVelY = (Math.random() - 0.5) * 8

      const confetti = {
        key: i,
        x: 0,
        y: 0,
        vX: randomVelX,
        vY: randomVelY,
      }

      return confetti
    })
  }

  useEffect(() => {
    setConfettis(createConfettis())
    const interval = setInterval(() => {
      setConfettis((oldConfettis: Confetti[]) => {
        const newConfettis: Confetti[] = []
        oldConfettis.forEach((confetti) => {
          confetti.vY += GRAVITY_ACCELERATION
          confetti.x += confetti.vX * FRAME_TIME * 200
          confetti.y += confetti.vY * FRAME_TIME * 200

          const viewportHeight = window.innerHeight
          const viewportWidth = window.innerWidth
          const heightFraction = (100 - CONFETTIS_BLAST_TOP) / 100
          const widthFraction = (100 - CONFETTIS_BLAST_LEFT) / 100
          // value to make sure the confettis don't trigger possibility of scrolling
          const threshold = 0.95
          if (
            confetti.y < viewportHeight * heightFraction * threshold &&
            confetti.x < viewportWidth * widthFraction * threshold &&
            confetti.x > -viewportWidth * widthFraction * threshold
          ) {
            newConfettis.push(confetti)
          }
        })
        if (newConfettis.length === 0) {
          clearInterval(interval)
        }
        return newConfettis
      })
    }, FRAME_TIME * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <ConfettisBlast
      topPosition={CONFETTIS_BLAST_TOP}
      leftPosition={CONFETTIS_BLAST_LEFT}
    >
      {confettis.map((confetti: Confetti) => (
        <ConfettiSquare key={confetti.key} x={confetti.x} y={confetti.y} />
      ))}
    </ConfettisBlast>
  )
}

export default ConfettisAnimation

const ConfettisBlast = styled.div<{
  topPosition: number
  leftPosition: number
}>`
  position: absolute;
  top: ${({ topPosition }) => `${topPosition}%`};
  left: ${({ leftPosition }) => `${leftPosition}%`};
`

const ConfettiSquare = styled.div.attrs<{ x: number; y: number }>(
  ({ x, y }) => ({
    style: {
      transform: `translate(${x}px, ${y}px)`,
    },
  })
)<{ x: number; y: number }>`
  position: absolute;
  width: 8px;
  height: 8px;
  transform-origin: center;
  background-color: green;
`
