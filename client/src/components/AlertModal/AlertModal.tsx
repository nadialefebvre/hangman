import React, { useEffect } from "react"
import styled from "styled-components/macro"

interface AlertModalProps {
  message: string
  onHideModal: () => void
}

const AlertModal: React.FC<AlertModalProps> = ({ message, onHideModal }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHideModal()
    }, 1500)
    return () => clearTimeout(timer)
  })

  return <StyledDiv>{message}</StyledDiv>
}

export default AlertModal

const StyledDiv = styled.div`
  width: 400px;
  height: 200px;
  padding: 40px;
  background: #363636fa;
  color: #fff;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 150%;
`
