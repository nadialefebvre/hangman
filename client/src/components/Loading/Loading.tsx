import Lottie from "lottie-react"
import React from "react"
import styled from "styled-components/macro"

import pixelLottie from "./lottie-animation.json"

const Loading: React.FC = () => {
  console.log("I am loading!")

  return (
    <LoaderWrapper>
      <Loader animationData={pixelLottie} loop={true} />
    </LoaderWrapper>
    // <Loader>
    //   <h2>LOADING!!!</h2>
    // </Loader>
  )
}

export default Loading

const LoaderWrapper = styled.div`
  width: 50%;
  margin: auto;
`

const Loader = styled(Lottie)`
  /* svg {
    path {
      fill: red;
    }
  } */
`
