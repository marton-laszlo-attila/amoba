import { useState } from "react";
import GameInput from "./components/GameInput";
import PlayGame from "./components/PlayGame";

import './css/style.css';

function App() {
  const [status, setStatus] = useState(false);
  const [gameData, setGameData] = useState({})

  return (
    <div className="App">
      <h1>Amőba</h1>
      {!status && <GameInput gameData={gameData} setGameData={setGameData} setStatus={setStatus} />}
      {status && <PlayGame gameData={gameData} />}
    </div>
  );
}

export default App;
