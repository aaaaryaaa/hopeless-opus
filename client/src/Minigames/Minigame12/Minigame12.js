import React, { useState, useEffect } from 'react';
import { maze as initialMaze } from './maze'; // Assuming you have the 20x20 maze structure in this file

const Minigame12 = ({ gameResult }) => {
  const [maze, setMaze] = useState(initialMaze); // State for the maze
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45); // Increase time for a larger maze
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [restartCount, setRestartCount] = useState(0);

  // Predefined path that should never be blocked
  const criticalPath = [
    { x: 0, y: 0 }, // Player starts at (0, 0)
    { x: 1, y: 0 },
    { x:0, y: 1},
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 19, y: 19 }, // End point
  ];

  // Timer logic
  useEffect(() => {
    if (!gameStarted || gameOver || win) return;

    const timerId = setInterval(() => {
      setTimeLeft((time) => {
        if (time > 0) return time - 1;
        clearInterval(timerId);
        setGameOver(true); // Set game over when the timer reaches 0
        return 0;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameStarted, gameOver, win]);

  // Handle movement with keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || win || !gameStarted) return;

      let newX = playerPosition.x;
      let newY = playerPosition.y;

      switch (e.key) {
        case 'ArrowDown':
          newY = playerPosition.y + 1;
          break;
        case 'ArrowLeft':
          newX = playerPosition.x - 1;
          break;
        case 'ArrowRight':
          newX = playerPosition.x + 1;
          break;
        case 'ArrowUp':
          newY = playerPosition.y - 1;
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

  // Handle player movement
  const movePlayer = (x, y) => {
    if (x < 0 || x >= 20 || y < 0 || y >= 20) return; // Ensure player stays within maze bounds

    // Check if the new position is a path (0) and not a wall (1)
    if (maze[y][x] === 0) {
      setPlayerPosition({ x, y });
      setClickCount((count) => count + 1);

      if (x === 19 && y === 19) { // Win point at (19, 19) for 20x20 maze
        setWin(true);
        setGameOver(true);
        gameResult(400);
      }

      // Toggle walls dynamically after the player moves
      toggleWalls();
    }
  };

  // Toggle dynamic walls, but don't block the critical path
  const toggleWalls = () => {
    const updatedMaze = [...maze];

    for (let i = 0; i < 5; i++) {
      const randomX = Math.floor(Math.random() * 20);
      const randomY = Math.floor(Math.random() * 20);

      // Ensure the position is not part of the critical path
      const isOnCriticalPath = criticalPath.some(
        (pos) => pos.x === randomX && pos.y === randomY
      );

      // Don't block the player or the end point
      if (
        !isOnCriticalPath &&
        !(randomX === playerPosition.x && randomY === playerPosition.y) &&
        !(randomX === 19 && randomY === 19)
      ) {
        // Toggle between wall (1) and path (0)
        updatedMaze[randomY][randomX] = updatedMaze[randomY][randomX] === 1 ? 0 : 1;
      }
    }

    setMaze(updatedMaze);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setClickCount(0);
    setTimeLeft(45); // Reset time to 30 seconds for the larger maze
    setGameOver(false);
    setWin(false);
    setGameStarted(false);
    setRestartCount((count) => count + 1);
    setMaze(initialMaze); // Reset maze to its initial state
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="text-center bg-black backdrop-blur-md rounded-lg shadow-lg p-6 w-100 mt-28" >
        <h1 className="text-2xl pb-2 underline underline-offset-1">Maze Game</h1>
        <h1 className="text-sm pb-5">The Creature is After you!</h1>
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
          <div
            className="grid gap-1 mt-6 justify-center mx-auto"
            style={{
              gridTemplateColumns: 'repeat(20, 1fr)',
              gridTemplateRows: 'repeat(20, 1fr)',
            }}
          >
            {maze.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`w-4 h-4 transition-colors duration-300 ${
                      cell === 1 ? 'bg-green-900' : 'bg-green-00'
                    } ${
                      playerPosition.x === colIndex && playerPosition.y === rowIndex
                        ? 'bg-white'
                        : ''
                    } ${
                      colIndex === 19 && rowIndex === 19 ? 'bg-red-500' : ''
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
              {win ? 'Congratulations! You Won!' : "Time's Up! Game Over! (Hint: Try Spamming Keys to get out of Tricky Areas!)"}
            </h2>

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

export default Minigame12;
