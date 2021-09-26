import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type dataType = {
  sign: string,
  name: string,  
}

type gameDataType = {
  hit: number,
  data: dataType[],
  players: number,
  net: number
}

type PlayGameProps = {
  gameData: gameDataType, 
  win: boolean,
  setWin: Function,
  init: boolean,
  reStart: Function
}


export default function PlayGame({ gameData, win, setWin, init, reStart }: PlayGameProps) {
  const [current, setCurrent] = useState(0);
  const [playData, setPlayData] = useState([[0]]);

  const check = Array(gameData.data.length).fill(0).map((item, index) => (index + 1).toString().repeat(gameData.hit));

  useEffect(() => {
    let playDataInit:number[][] = [];
    for (let r = 0; r < gameData.net; r++) {
      playDataInit.push([...Array(gameData.net).fill(0)])
    }
    setPlayData(playDataInit);
    setCurrent(0);

  }, [init, gameData.net])

  const handleCellClick = (c: any) => {
    const pos = c.split('x');
    let oldPlayData:any = [...playData];
    oldPlayData[pos[0]][pos[1]] = current + 1;

    setPlayData(oldPlayData);

    find() ? setWin(true) : setCurrent((current + 1) % gameData.players);
  }

  const find = () => {

    // diagonal rotation function
    const playDataRotated = (playData:number[][], type: string) => {
      let summax = (playData.length + playData[0].length - 1); // max index of diagonal matrix
      let rotated:number[][] = []; // initialize to an empty matrix of the right size
      for (let i = 0; i < summax; ++i) rotated.push([]);
      // Fill it up by partitioning the original matrix.
      if (type === "left")
        for (let j:number = 0; j < playData[0].length; ++j)
          for (let i:number = 0; i < playData.length; ++i) rotated[i + j].push(playData[i][j]);

      if (type === "right")
        for (let j = 0; j < playData[0].length; ++j)
          for (let i = 0; i < playData.length; ++i) rotated[i + j].push(playData[j][playData.length - i - 1]);

      return rotated.map(item => item.join('')).join('|');
    }

    let netData:string[] = [];

    // linear data
    netData.push([...playData.map((item:any[], index:number) => item.join(''))].join('|'));
    netData.push([...playData.map((item:any[], index:number) => playData.map(row => row[index]).join(''))].join('|'));

    // // diagonal data
    netData.push(playDataRotated(playData, 'left'));
    netData.push(playDataRotated(playData, 'right'));

    // default hit
    let hit:any = false;

    // check hit
    check
      .forEach((st, player) => {
        netData
          .forEach((item, index) => {
            if (item.indexOf(st) > -1) hit = { player: player, index: index, pos: item.indexOf(st) }
          });
      });

    return hit ? true : false;
  }

  return <div className="gamePlayContainer">
    <div className="gamePlayInfo">
      <div className="gamePlayInfoPlayers">
        {
          gameData.data.map((item:any, index:number) =>
            <div
              className={index === current ? win ? "win" : "current" : undefined}
              key={uuidv4()}
            >
              {(win && index === current) && <span className="win">Győzött</span>} {item.name} ({item.sign})
          </div>
          )}
      </div>
      <div>Az győz, akinek először összejön egymás mellett vízszintesen,<br /> függőlegesen vagy átlósan {gameData.hit} jel</div>
    </div>
    <table>
      <tbody>
        {console.log(playData)}
        {
          playData
            .map((row:number[], index1:number) => <tr key={uuidv4()}>
              {row
                .map((column:number, index2:number) =>
                  <td
                    key={uuidv4()}
                    onClick={
                      (!playData[index1][index2] && !win) ? () => handleCellClick(`${index1}x${index2}`) : undefined
                    }
                    className={(playData[index1][index2] || win) ? "noClick" : undefined}
                  >
                    {playData[index1][index2] > 0 && gameData.data[playData[index1][index2] - 1].sign}
                  </td>)
              }
            </tr>
            )
        }
      </tbody>
    </table>
    {/* {win && */}
    <div className={`gameWin${!win ? ' gameWinHidden' : ''}`}>
      <button className="gameWinNew" onClick={() => reStart("new")}>Új menet</button>
      <button className="gameWinMenu" onClick={() => reStart("menu")}>Menü</button>
    </div>
    {/* } */}
  </div>
}