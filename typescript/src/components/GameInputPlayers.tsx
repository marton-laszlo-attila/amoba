import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const sign = ["O", "X", "M", "V", "D", "E", "T"];

type dataType = {
  name: string,
  key: string,
  id: number,
  sign: string
}

type GameInputPlayersType = {
  handleChange: Function,
  position: number,
  players: number,
  data: dataType[]
}

type tType = {
  target: {
  value: any
  id: any
  }
}

export default function GameInputPlayers({ handleChange, position, players, data }:GameInputPlayersType) {
  const [playersData, setPlayersData] = useState(data);

  const save = (data:object[]) => {
    handleChange({ target: { id: "data", value: data } }, 2);
  }

  useEffect(() => {

    // setting basis parameters
    let oldPlayersData = [...data];
    for (let i = oldPlayersData.length; i < players; i++) {
      oldPlayersData.push({
        id: i,
        name: "",
        sign: sign[i],
        key: uuidv4()
      });
    }

    // if change players number
    if (players < data.length) oldPlayersData.splice(players, data.length - players);
    if (data.length) save(oldPlayersData);

    setPlayersData(oldPlayersData)

  }, [players])


  const validation = (data:dataType[]) => {
    return data.filter(item => item.name !== "").length === data.length ? true : false;
  }

  // is change player data
  const handleChangeData = (t:tType, p:number, i:any) => {
    let oldPlayersData:any = [...playersData];
    oldPlayersData[p][i] = t.target.value;
    setPlayersData(oldPlayersData);
    save(oldPlayersData);
  }

  return <div>
    {
      playersData
        .map((item1:dataType, index1) =>
          <div
            className="playersData"
            key={item1.key}
          >
            <input
              placeholder={`${index1 + 1}. játékos neve`}
              type="text"
              id={`ne${item1.id}`}
              disabled={position < 2 ? true : false}
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
                    .map((item2) =>
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
  </div>
}