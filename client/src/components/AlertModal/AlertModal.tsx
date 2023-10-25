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

  return (
    <Overlay>
      <Alert>{message}</Alert>
    </Overlay>
  )
}

export default AlertModal

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const Alert = styled.div`
  width: 400px;
  height: 200px;
  padding: 40px;
  background: #363636fa;
  color: #fff;
  z-index: 3;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 150%;
`
