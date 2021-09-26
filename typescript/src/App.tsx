import { useState, useEffect } from "react";

import GameInput from "./components/GameInput";
import PlayGame from "./components/PlayGame";

import './css/style.css';

function App() {
  const [start, setStart] = useState(true);
  const [status, setStatus] = useState(false);
  const [pos, setPos] = useState(1);
  const [init, setInit] = useState(true);
  const [win, setWin] = useState(false);
  const [gameData, setGameData] = useState({
    hit: 0,
    data: [{sign:'', name: ''}],
    players: 0,
    net: 0
  });

  const reStart = (s: string) => {
    // new game
    switch (s) {
      // with set parameters 
      case "new":
        setInit(!init)
        setStatus(true);
        setWin(false);
        break;
      // with new parameters
      case "menu":
        setStatus(false);
        setWin(false);
        setPos(4);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setStart(false);
  }, [])

  return (
    <div className={start ? "StartAppContainer" : "appContainer"}>
      <h1 className={start ? "StartH1" : ""}>Amőba</h1>
      {!status && <GameInput pos={pos} gameData={gameData} start={start} setGameData={setGameData} setStatus={setStatus} />}
      {status && <PlayGame gameData={gameData} init={init} reStart={reStart} win={win} setWin={setWin} />}
    </div>
  );
}

export default App;
