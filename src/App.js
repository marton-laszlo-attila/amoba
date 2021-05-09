import { useState, useEffect } from "react";
import GameInput from "./components/GameInput";
import PlayGame from "./components/PlayGame";

import './css/style.css';

function App() {
  const [start, setStart] = useState(1);
  const [status, setStatus] = useState(false);
  const [pos, setPos] = useState(1);
  const [init, setInit] = useState(true);
  const [win, setWin] = useState(false);
  const [gameData, setGameData] = useState({});

  const reStart = (s) => {
    console.log("restart");

    switch (s) {
      case "new":
        setInit(!init)
        setStatus(true);
        setWin(false);
        break;
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
    setStart(0);
  }, [])

  return (
    <div className="App">
      <h1 className={start && "StartH1"}>Amőba</h1>
      {!status && <GameInput pos={pos} gameData={gameData} start={start} setGameData={setGameData} setStatus={setStatus} />}
      {status && <PlayGame gameData={gameData} init={init} setInit={setInit} reStart={reStart} win={win} setWin={setWin} />}
    </div>
  );
}

export default App;
