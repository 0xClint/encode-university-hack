import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { GameProvider } from "./contexts/gameProvider.jsx";

createRoot(document.getElementById("root")).render(
  <GameProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </GameProvider>
);
