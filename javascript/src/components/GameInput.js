import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import GameInputPlayers from "./GameInputPlayers";

export default function GameInput({ gameData, setGameData, setStatus, pos, start }) {
  const [position, setPosition] = useState(pos);

  // change imput field
  const handleChange = (t, pos) => {
    const value = t.target.value;
    const id = t.target.id;

    let oldGameData = { ...gameData };
    oldGameData[id] = id === "data" ? value : parseInt(value);

    // create hit parameters
    if (id === "net") oldGameData.hit = Math.floor(value / 2);

    setGameData(oldGameData);

    // form validation
    if (pos === 1 && oldGameData.players) pos = 2;
    if (pos === 2 && oldGameData.data && validation(oldGameData.data)) pos = 3;
    if (pos === 4 && !validation(oldGameData.data)) pos = 3;
    id === "net" && parseInt(value) === 0 ? pos = 0 : pos++;
    setPosition(pos);
  }

  const handleStart = (t) => {
    setStatus(true);
  }

  // players data validation
  const validation = (data) => {
    return data.filter(item => item.name !== "").length === data.length ? true : false;
  }

  return <div className={`gameInputContainer${start ? " startGameInputContainer" : ''}`}>
    <div className="gameInputField net">
      <label htmlFor="net">Pálya méret:</label>
      <select value={gameData.net ? gameData.net : 0} id="net" onChange={(t) => handleChange(t, 1)}>
        <option value="0" ></option>
        {
          Array
            .from({ length: 16 }, (v, k) => 5 + k)
            .map((item, index) =>
              <option
                key={uuidv4()}
                value={item}
              >
                {`${item}x${item}`}
              </option>
            )
        }
      </select>
    </div>
    <div className={`gameInputField players${position < 2 ? ' hidden' : ''}`}>
      <label htmlFor="players">Játékosok száma:</label>
      <select
        value={gameData.players ? gameData.players : 0}
        id="players"
        disabled={position < 2 ? true : false}
        onChange={(t) => handleChange(t, 2)}
      >
        <option value="0"></option>
        {
          Array
            .from({ length: 5 }, (v, k) => 2 + k)
            .map((item, index) =>
              <option
                key={uuidv4()}
                value={item}
              >
                {item}
              </option>)
        }
      </select>
    </div>
    <div className={`gameInputField data${position < 3 ? ' hidden' : ''}`}>
      <GameInputPlayers
        handleChange={handleChange}
        position={position}
        players={gameData.players}
        data={gameData.data ? gameData.data : []}
      />
    </div>
    <div className={`gameInputField start${position < 4 ? ' hidden' : ''}`}>
      <button onClick={handleStart} type="button" disabled={position < 4 ? true : false}>Start</button>
    </div>
  </div>
}