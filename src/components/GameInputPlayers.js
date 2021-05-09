import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

// export default function GameInputPlayers({ handleChange, position, players, gameData, setGameData }) {
export default function GameInputPlayers({ handleChange, position, players, data }) {
  const [playersData, setPlayersData] = useState([...data]);
  const sign = ["O", "X", "M", "V", "D", "E", "T"];

  useEffect(() => {
    // console.log('players data imit: ', playersData.length, players);
    let oldPlayersData = [...playersData];

    for (let i = oldPlayersData.length; i < players; i++) {
      oldPlayersData.push({
        id: i,
        name: "",
        sign: sign[i],
        key: uuidv4()
      });
    }

    if (players < playersData.length) oldPlayersData.splice(players, playersData.length - players);
    if (playersData.length) save(oldPlayersData);

    setPlayersData(oldPlayersData)

    // ha visszalép a menübe, és ki vannak töltve a név mezők, akkor ment
    // console.log('v ', validation(oldPlayersData), oldPlayersData);
    // if (oldPlayersData.length && validation(oldPlayersData)) save(playersData);

  }, [players])

  const handleChangeData = (t, p, i) => {
    // console.log(t.target.value)
    let oldPlayersData = [...playersData];
    oldPlayersData[p][i] = t.target.value;
    setPlayersData(oldPlayersData);

    save(oldPlayersData);

    // if (validation(playersData)) save(oldPlayersData, 3);
    // else save(0, 3);
    // handleChange({ target: { id: "data", value: playersData } }, 3);
  }

  const validation = (data) => {
    return data.filter(item => item.name !== "").length === data.length ? true : false;
  }

  const save = (data) => {
    handleChange({ target: { id: "data", value: data } }, 2);
  }

  return <>
    {/* {console.log("playesrs ", playersData)} */}
    {
      playersData
        .map((item1, index1) =>
          <div
            className="playersData"
            key={item1.key}
          >
            <input
              placeholder={`${index1 + 1}. játékos neve`}
              type="text"
              id={`ne${item1.id}`}
              disabled={position < 2 ? true : false}
              // onChange={handleChangeData}
              onChange={(t) => handleChangeData(t, index1, "name")}
              value={item1.name}
            />
            <div>
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
                        key={uuidv4()}
                        value={item2}
                        disabled={playersData.filter(item => item.sign === item2).length ? true : false}
                      >
                        {item2}
                      </option>
                    )
                }
              </select>
            </div>
          </div>)
    }
    {!validation(playersData) && <div>Töltsd ki a név mezőket!</div>}
  </>
}