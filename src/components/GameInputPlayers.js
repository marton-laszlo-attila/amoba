import { useState, useEffect } from "react";

export default function GameInputPlayers({ handleChange, position, players, gameData, setGameData }) {
  const sign = ["O", "X", "M", "V", "D", "E", "T"];

  useEffect(() => {
    let oldGameData = { ...gameData };
    oldGameData.data = [];

    for (let i = 0; i < players; i++) {
      oldGameData.data.push({
        id: i,
        name: "",
        sign: sign[i]
      });
    }
    setGameData(oldGameData);

  }, [players])

  const handleChangeData = (t, p, i) => {
    let oldGameData = { ...gameData };
    oldGameData.data[p][i] = t.target.value;
    setGameData(oldGameData);

    if (gameData.data.filter(item => item.name !== "").length === gameData.data.length)
      handleChange({ target: { id: "data", value: "1" } }, 3);
    else handleChange({ target: { id: "data", value: "0" } }, 3);
  }

  return <div id="data-3">
    {
      gameData.data && gameData.data
        .map((item1, index1) => <div key={index1} >
          <input
            placeholder={`${index1 + 1}. játékos neve`}
            type="text"
            id={`ne${item1.id}`}
            disabled={position < 2 ? true : false}
            onChange={(t) => handleChangeData(t, index1, "name")}
          />
          <label htmlFor={`ps${item1.id}`} >Jele:</label>
          <select
            onChange={(t) => handleChangeData(t, index1, "sign")}
            value={item1.sign}
            disabled={position < 2 ? true : false}
            id={`ps${item1.id}`}
          >
            {
              sign
                .map((item2, index2) =>
                  <option
                    // defaultValue={item2 === item1.sign ? item1.sign : false}
                    // selected={item2 === item1.sign ? true : false}
                    key={`pop${index2}`}
                    value={item2}
                    disabled={gameData.data.filter(item => item.sign === item2).length ? true : false}
                  >
                    {item2}
                  </option>
                )
            }
          </select>
        </div>)
    }

  </div>
}