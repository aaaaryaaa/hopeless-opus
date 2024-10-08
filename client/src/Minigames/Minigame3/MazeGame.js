// // src/MazeGame.js
// import React, { useState, useEffect } from 'react';
// import { maze } from './maze';
// import './MazeGame.css';

// const MazeGame = () => {
//   const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
//   const [clickCount, setClickCount] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [gameOver, setGameOver] = useState(false);
//   const [win, setWin] = useState(false);
//   const [gameStarted, setGameStarted] = useState(false); // Track if game has started

//   // Timer logic
//   useEffect(() => {
//     if (!gameStarted || gameOver || win) return;

//     if (timeLeft === 0) {
//       setGameOver(true);
//       return;
//     }

//     const timerId = setInterval(() => {
//       setTimeLeft((time) => time - 1);
//     }, 1000);

//     return () => clearInterval(timerId);
//   }, [timeLeft, gameStarted, gameOver, win]);

//   // Handle movement with keyboard
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (gameOver || win || !gameStarted) return;

//       let newX = playerPosition.x;
//       let newY = playerPosition.y;

//       switch (e.key) {
//         case 'ArrowUp':
//           newY = playerPosition.y - 1;
//           break;
//         case 'ArrowDown':
//           newY = playerPosition.y + 1;
//           break;
//         case 'ArrowLeft':
//           newX = playerPosition.x - 1;
//           break;
//         case 'ArrowRight':
//           newX = playerPosition.x + 1;
//           break;
//         default:
//           return;
//       }

//       movePlayer(newX, newY);
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [playerPosition, gameOver, win, gameStarted]);

//   const movePlayer = (x, y) => {
//     // Check boundaries for a 10x10 grid
//     if (x < 0 || x >= 10 || y < 0 || y >= 10) return;

//     // Check if the next position is a path
//     if (maze[y][x] === 0) {
//       setPlayerPosition({ x, y });
//       setClickCount((count) => count + 1);

//       // Check for win condition at the bottom-right corner of the 10x10 maze
//       if (x === 9 && y === 9) {
//         setWin(true);
//         setGameOver(true);
//       }
//     }
//   };

//   const handleClick = (direction) => {
//     if (gameOver || win || !gameStarted) return;

//     let { x, y } = playerPosition;

//     switch (direction) {
//       case 'up':
//         y -= 1;
//         break;
//       case 'down':
//         y += 1;
//         break;
//       case 'left':
//         x -= 1;
//         break;
//       case 'right':
//         x += 1;
//         break;
//       default:
//         break;
//     }

//     movePlayer(x, y);
//   };

//   const startGame = () => {
//     setGameStarted(true);
//   };

//   const resetGame = () => {
//     setPlayerPosition({ x: 0, y: 0 });
//     setClickCount(0);
//     setTimeLeft(60);
//     setGameOver(false);
//     setWin(false);
//     setGameStarted(false);
//   };

//   return (
//     <div className="game-container">
//       <h1>Maze Game</h1>
//       {!gameStarted && !gameOver && (
//         <button onClick={startGame} className="start-button">Start Game</button>
//       )}
//       <div className="stats">
//         <p>Clicks: {clickCount}</p>
//         <p>Time Left: {timeLeft}s</p>
//       </div>
//       <div className="maze">
//         {maze.map((row, rowIndex) => (
//           <div key={rowIndex} className="maze-row">
//             {row.map((cell, colIndex) => (
//               <div
//                 key={colIndex}
//                 className={`maze-cell ${
//                   cell === 1 ? 'wall' : 'path'
//                 } ${
//                   playerPosition.x === colIndex && playerPosition.y === rowIndex
//                     ? 'player'
//                     : ''
//                 } ${
//                   colIndex === 9 && rowIndex === 9 ? 'goal' : ''
//                 }`}
//               ></div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="controls">
//         <button onClick={() => handleClick('up')}>↑</button>
//         <button onClick={() => handleClick('left')}>←</button>
//         <button onClick={() => handleClick('down')}>↓</button>
//         <button onClick={() => handleClick('right')}>→</button>
//       </div>
//       {gameOver && (
//         <div className="overlay">
//           {win ? <h2>Congratulations! You Won!</h2> : <h2>Time's Up! Game Over!</h2>}
//           <button onClick={resetGame}>Restart</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MazeGame;

// src/MazeGame.js
import React, { useState, useEffect } from 'react';
import { maze } from './maze';
import './MazeGame.css';

const MazeGame = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // Track if game has started

  // Timer logic
  useEffect(() => {
    if (!gameStarted || gameOver || win) return;

    if (timeLeft === 0) {
      setGameOver(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, gameStarted, gameOver, win]);

  // Handle movement with keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || win || !gameStarted) return;

      let newX = playerPosition.x;
      let newY = playerPosition.y;

      switch (e.key) {
        case 'ArrowUp':
          newY = playerPosition.y - 1;
          break;
        case 'ArrowDown':
          newY = playerPosition.y + 1;
          break;
        case 'ArrowLeft':
          newX = playerPosition.x - 1;
          break;
        case 'ArrowRight':
          newX = playerPosition.x + 1;
          break;
        default:
          return;
      }

      movePlayer(newX, newY);
      e.preventDefault(); // Prevent default scrolling behavior
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, gameOver, win, gameStarted]);

  const movePlayer = (x, y) => {
    // Check boundaries for a 10x10 grid
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return;

    // Check if the next position is a path
    if (maze[y][x] === 0) {
      setPlayerPosition({ x, y });
      setClickCount((count) => count + 1);

      // Check for win condition at the bottom-right corner of the 10x10 maze
      if (x === 9 && y === 9) {
        setWin(true);
        setGameOver(true);
      }
    }
  };

  const handleClick = (direction) => {
    if (gameOver || win || !gameStarted) return;

    let { x, y } = playerPosition;

    switch (direction) {
      case 'up':
        y -= 1;
        break;
      case 'down':
        y += 1;
        break;
      case 'left':
        x -= 1;
        break;
      case 'right':
        x += 1;
        break;
      default:
        break;
    }

    movePlayer(x, y);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setClickCount(0);
    setTimeLeft(30);
    setGameOver(false);
    setWin(false);
    setGameStarted(false);
  };

  return (
    <div className="game-container">
      <h1 className='game-name text-lg pb-5'>Maze Game</h1>
      {!gameStarted && !gameOver && (
        <button onClick={startGame} className="start-button ">Start Game</button>
      )}
      <div className="stats">
        <div className='clicks'>Clicks: {clickCount}</div>
        <div className='time'>Time Left: {timeLeft}s</div>
      </div>
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`maze-cell ${
                  cell === 1 ? 'wall' : 'path'
                } ${
                  playerPosition.x === colIndex && playerPosition.y === rowIndex
                    ? 'player'
                    : ''
                } ${
                  colIndex === 9 && rowIndex === 9 ? 'goal' : ''
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
      <div className='conto'>
      <button className='left-button' onClick={() => handleClick('left')}>←</button>
        <button className='up-button' onClick={() => handleClick('up')}>↑</button>
        
          
          <button className='down-button' onClick={() => handleClick('down')}>↓</button>
          <button className='right-button' onClick={() => handleClick('right')}>→</button>
        </div>
      </div>
      {gameOver && (
        <div className="overlay">
          {win ? <h2>Congratulations! You Won!</h2> : <h2>Time's Up! Game Over!</h2>}
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default MazeGame;

