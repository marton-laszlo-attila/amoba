import { useState } from "react";
import GameInputPlayers from "./GameInputPlayers";

export default function GameInput({ gameData, setGameData, setStatus }) {
  const [position, setPosition] = useState(1);
  const [players, setPlayers] = useState(0);

  const handleChange = (t, p) => {
    const value = parseInt(t.target.value);
    const id = t.target.id;
    setPosition(value !== 0 ? p + 1 : p);

    if (id === "players") setPlayers(value);

    if (id !== "data") {
      let oldGameData = { ...gameData };
      oldGameData[id] = value;

      if (id === "net") oldGameData.hit = Math.floor(value / 2);

      setGameData(oldGameData);
    }
  }

  const handleStart = (t) => {
    setStatus(true);
  }

  return <div className="gameImputContainer">
    <div className="gameImputField">
      <label htmlFor="net">Pálya méret:</label>
      <select id="net" onChange={(t) => handleChange(t, 1)}>
        <option value="0" ></option>
        {
          Array
            .from({ length: 16 }, (v, k) => 5 + k)
            .map((item, index) => <option key={`op${index}`} value={item}>{`${item}x${item}`}</option>)
        }
      </select>
    </div>
    <div className="gameImputField">
      <label htmlFor="players">Játékosok száma:</label>
      <select id="players" disabled={position < 2 ? true : false} onChange={(t) => handleChange(t, 2)}>
        <option value="0"></option>
        {
          Array
            .from({ length: 5 }, (v, k) => 2 + k)
            .map((item, index) => <option key={`pl${index}`} value={item}>{item}</option>)
        }
      </select>
    </div>
    <div className="gameImputField">
      <GameInputPlayers
        handleChange={handleChange}
        position={position}
        players={players}
        gameData={gameData}
        setGameData={setGameData}
      />
    </div>
    <div className="gameImputField">
      <button onClick={handleStart} type="button" disabled={position < 4 ? true : false}>Start</button>
    </div>
  </div>
}