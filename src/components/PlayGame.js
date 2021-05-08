import { useState, useEffect } from 'react';

export default function PlayGame({ gameData }) {
  const [current, setCurrent] = useState(0);
  const [playData, setPlayData] = useState([]);

  useEffect(() => {
    let playDataInit = [];
    for (let r = 0; r < gameData.net; r++) {
      playDataInit.push([...Array(gameData.net)])
    }
    setPlayData(playDataInit);
  }, [])

  const handleCellClick = (c) => {
    console.log('click', c)
    const pos = c.split('x');
    let oldPlayData = [...playData];
    oldPlayData[pos[0]][pos[1]] = current;

    setPlayData(oldPlayData);
    console.log("....", gameData.players, (current + 1) % gameData.players);

    find() && console.log("--------------------WIN", gameData.data[current].sign);
    setCurrent((current + 1) % gameData.players);
  }

  const find = () => {
    // row
    let hit = 0;
    for (let r = 0; r < playData.length; r++) {
      let prev = playData[r][0];
      for (let c = 0; c < playData[r].length; c++) {
        let current = playData[r][c];
        if (current !== undefined && current === prev) hit = hit + 1;
        else prev = playData[r][c];
        if (hit === gameData.hit - 1) return true;
      }
      hit = 0;
    }

    // column
    hit = 0;
    for (let c = 0; c < playData.length; c++) {
      let prev = playData[0][c];
      for (let r = 0; r < playData.length; r++) {
        let current = playData[r][c];
        if (current !== undefined && current === prev) hit = hit + 1;
        else prev = playData[r][c];
        if (hit === gameData.hit - 1) return true;
      }
      hit = 0;
    }

    // diagonal left
    let hit1 = 0;
    let hit2 = 0;
    for (let d = 0; d < playData.length; d++) {
      let prev1 = playData[0][d];
      let prev2 = playData[playData.length - 1][playData.length - 1];
      // console.log(d);
      for (let l = 0; l <= d; l++) {
        let current1 = playData[d - l][l];
        let current2 = playData[playData.length - d + l - 1][playData.length - l - 1];
        // console.log("---->", d - l, l)
        if (current1 !== undefined && current1 === prev1) hit1 = hit1 + 1;
        else prev1 = current1;
        if (current2 !== undefined && current2 === prev2) hit2 = hit2 + 1;
        else prev2 = current2;
        if (hit1 === gameData.hit - 1) return true;
        if (hit2 === gameData.hit - 1) return true;
      }
      hit1 = 0;
      hit2 = 0;
    }

    // diagonal right
    hit1 = 0;
    hit2 = 0;

    console.log("diagonal right ------------------------")
    for (let d = 0; d < playData.length; d++) {
      let prev1 = playData[playData.length - 1][d];
      let prev2 = playData[0][playData.length - 1];
      console.log(d);
      for (let l = 0; l <= d; l++) {
        let current1 = playData[d - l][playData.length - l - 1];
        let current2 = playData[playData.length - d + l - 1][l];
        if (current1 !== undefined && current1 === prev1) hit1 = hit1 + 1;
        else prev1 = current1;
        if (current2 !== undefined && current2 === prev2) hit2 = hit2 + 1;
        else prev2 = current2;
        console.log("---->", d - l, playData.length - l - 1, hit1)
        console.log("hit ", hit1, hit2)

        if (hit1 === gameData.hit - 1) return true;
        if (hit2 === gameData.hit - 1) return true;
      }
      hit1 = 0;
      hit2 = 0;
    }

    // hit = 0;
    // for (let d = 0; d < playData.length; d++) {
    //   let prev = playData[playData.length - 1][playData.length - 1];
    //   console.log(d);
    //   for (let l = 0; l <= d; l++) {
    //     let current = playData[playData.length - d + l - 1][playData.length - l - 1];
    //     console.log("---->", playData.length - d + l - 1, playData.length - l - 1)
    //     if (current !== undefined && current === prev) hit = hit + 1;
    //     else prev = current;
    //     if (hit === gameData.hit - 1) return true;
    //   }
    //   hit = 0;
    // }

    return false;
  }




  return <div className="gamePlayContainer">
    <div className="gamePlayInfo">
      {/* {console.log(playData)} */}
      {
        gameData.data.map((item, index) =>
          <div
            className={index === current ? "current" : undefined}
            key={`pl${index}`}
          >
            {item.name} ({item.sign})
          </div>
        )}
      <div>Az győz, akinek először összejön egymás mellett vízszintesen, függőlegesen vagy átlósan {gameData.hit} jel</div>
    </div>
    <table>
      <tbody>
        {/* {console.log("--- ", playData)} */}
        {
          playData
            .map((row, index1) => <tr>
              {row
                .map((column, index2) =>
                  <td
                    onClick={
                      !gameData.data[playData[index1][index2]] ? () => handleCellClick(`${index1}x${index2}`) : undefined
                    }
                    className={gameData.data[playData[index1][index2]] ? "noClick" : undefined}
                  >
                    {gameData.data[playData[index1][index2]] && gameData.data[playData[index1][index2]].sign}
                  </td>)
              }
            </tr>
            )
        }
      </tbody>
    </table>
  </div>
}