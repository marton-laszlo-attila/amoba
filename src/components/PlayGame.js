import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function PlayGame({ gameData, win, setWin, init, reStart }) {
  const [current, setCurrent] = useState(0);
  const [playData, setPlayData] = useState([]);
  // const [init, setInit] = useState(true);
  // const [win, setWin] = useState(false);

  const check = Array(gameData.data.length).fill(0).map((item, index) => (index + 1).toString().repeat(gameData.hit));

  useEffect(() => {
    let playDataInit = [];
    for (let r = 0; r < gameData.net; r++) {
      playDataInit.push([...Array(gameData.net).fill(0)])
    }
    setPlayData(playDataInit);
    setCurrent(0);

  }, [init])

  const handleCellClick = (c) => {
    // console.log('click', c)
    const pos = c.split('x');
    let oldPlayData = [...playData];
    oldPlayData[pos[0]][pos[1]] = current + 1;

    setPlayData(oldPlayData);

    find() ? setWin(true) : setCurrent((current + 1) % gameData.players);
  }

  const find = () => {

    const playDataRotated = (playData) => {
      let summax = (playData.length + playData[0].length - 1) * 2; // max index of diagonal matrix
      let rotated = []; // initialize to an empty matrix of the right size
      for (let i = 0; i < summax; ++i) rotated.push([]);
      // Fill it up by partitioning the original matrix.
      for (let j = 0; j < playData[0].length; ++j)
        for (let i = 0; i < playData.length; ++i) rotated[i + j].push(playData[i][j]);

      for (let j = 0; j < playData[0].length; ++j)
        for (let i = 0; i < playData.length; ++i) rotated[i + j + summax / 2].push(playData[j][playData.length - i - 1]);
      return rotated.map(item => item.join('')).join('|');
    }

    let data = [
      // row és column
      ...playData.map((item, index) => [item.join(''), playData.map(row => row[index]).join('')].join('|')),
      // diagonal
      playDataRotated(playData)
    ].join('|')

    if (check.filter(item => data.includes(item)).length) return true;

    return false;
  }

  return <div className="gamePlayContainer">
    {/* {console.log('rend --- ', playData)} */}
    <div className="gamePlayInfo">
      <div className="gamePlayInfoPlayers">
        {
          gameData.data.map((item, index) =>
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
        {/* {console.log("--- ", playData)} */}
        {
          playData
            .map((row, index1) => <tr key={uuidv4()}>
              {row
                .map((column, index2) =>
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
    {win &&
      <div className="gameWin">
        <button className="gameWinNew" onClick={() => reStart("new")}>Új menet</button>
        <button className="gameWinMenu" onClick={() => reStart("menu")}>Menü</button>
      </div>
    }
  </div>
}