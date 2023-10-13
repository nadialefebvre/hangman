import React from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import { GameProvider } from "./game/context"

const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
)
