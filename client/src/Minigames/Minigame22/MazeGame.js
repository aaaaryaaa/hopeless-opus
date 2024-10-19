import React, { useState, useEffect } from 'react';
import { maze } from './maze'; // Assuming you have the maze structure in this file

const MazeGame = ({ gameResult }) => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [restartCount, setRestartCount] = useState(0); // Added state to track restarts

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
        case 'ArrowDown':
          newY = playerPosition.y - 1;
          break;
        case 'ArrowLeft':
          newY = playerPosition.y + 1;
          break;
        case 'ArrowRight':
          newX = playerPosition.x - 1;
          break;
        case 'ArrowUp':
          newX = playerPosition.x + 1;
          break;
        default:
          return;
      }

      movePlayer(newX, newY);
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, gameOver, win, gameStarted]);

  const movePlayer = (x, y) => {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return;

    if (maze[y][x] === 0) {
      setPlayerPosition({ x, y });
      setClickCount((count) => count + 1);

      if (x === 9 && y === 9) {
        setWin(true);
        setGameOver(true);
        gameResult(100 * timeLeft, true);
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
    setRestartCount((count) => count + 1); // Increment restart count on reset
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="text-center bg-gray-800/70 backdrop-blur-md rounded-lg shadow-lg p-6 w-80 mt-28"
      style={{ background: 'rgba(75, 85, 99, 0.7)', backdropFilter: 'blur(10px)' }} >
        <h1 className="text-2xl pb-5">Maze Game (NOTE: Controls have been swapped!)</h1>
        {!gameStarted && !gameOver && (
          <button
            onClick={startGame}
            className="px-6 py-2 h-16 text-lg bg-green-600 text-white rounded-lg hover:bg-green-700 transform hover:scale-105"
          >
            Start Game
          </button>
        )}
        <div className="grid grid-cols-2 gap-4 text-white text-lg mt-4">
          <div>Clicks: {clickCount}</div>
          <div>Time Left: {timeLeft}s</div>
        </div>

        {!gameOver && (
  <div className="grid grid-cols-10 grid-rows-10 gap-1 mt-6 justify-center mx-auto">
    {maze.map((row, rowIndex) => (
      <React.Fragment key={rowIndex}>
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={`w-6 h-6 transition-colors duration-300 ${
              cell === 1 ? 'bg-gray-800' : 'bg-gray-300'
            } ${
              playerPosition.x === colIndex && playerPosition.y === rowIndex
                ? 'bg-green-500'
                : ''
            } ${
              colIndex === 9 && rowIndex === 9 ? 'bg-yellow-500' : ''
            }`}
          ></div>
        ))}
      </React.Fragment>
    ))}
  </div>
)}


        {gameOver && (
          <div className="mt-8 p-6 border-2 border-yellow-700 rounded-lg bg-transparent">
            <h2 className="text-2xl text-white">
              {win ? 'Congratulations! You Won!' : "Time's Up! Game Over!"}
            </h2>

            {/* Hide the Restart button after 3 tries */}
            {restartCount < 3 && (
              <button
                className="px-4 py-2 mt-4 text-lg bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                onClick={resetGame}
              >
                Restart
              </button>
            )}
            {restartCount >= 3 && (
              <p className="text-red-500 mt-4">No more restarts available!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MazeGame;
