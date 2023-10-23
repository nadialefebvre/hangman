import { createGlobalStyle } from "styled-components/macro"

const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Press Start 2P", cursive;
    /* font-family: "VT323", monospace;
    font-family: "DotGothic16", sans-serif;
    letter-spacing: 8px; */
  }

  body {
    margin: 0;
  }

  button {
    cursor: pointer;
  }
`
export default GlobalStyle
