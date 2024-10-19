import React, { useState, useEffect, useRef } from 'react';
import './Dino.css';

function Minigame15({ gameResult }) {
  const [isJumping, setIsJumping] = useState(false);
  const [dinoPosition, setDinoPosition] = useState(0);
  const [obstaclePosition, setObstaclePosition] = useState(1000);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  
  const dinoRef = useRef(null);

  // Handle space key press for jump
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent the window from scrolling
        if (!isJumping && startGame && !gameOver) {
          setIsJumping(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isJumping, startGame, gameOver]);

  // Handle dino jump
  useEffect(() => {
    if (isJumping) {
      let upInterval = setInterval(() => {
        setDinoPosition((prevPos) => {
          if (prevPos < 150) return prevPos + 20;
          clearInterval(upInterval);
          let downInterval = setInterval(() => {
            setDinoPosition((prevPos) => {
              if (prevPos > 0) return prevPos - 20;
              clearInterval(downInterval);
              setIsJumping(false);
              return 0;
            });
          }, 20);
          return prevPos;
        });
      }, 50);
    }
  }, [isJumping]);

  // Move obstacle and detect collision
  useEffect(() => {
    if (startGame && !gameOver) {
      let obstacleInterval = setInterval(() => {
        setObstaclePosition((prevPos) => {
          if (prevPos > -50) return prevPos - 10;
          return 1000; // Reset obstacle position
        });
      }, 20);

      return () => clearInterval(obstacleInterval);
    }
  }, [startGame, gameOver]);

  // Check collision
  useEffect(() => {
    if (obstaclePosition > 0 && obstaclePosition < 100 && dinoPosition < 50 && !gameOver) {
      setGameOver(true);
      setStartGame(false); // Stop the game after collision
    } else if (!gameOver && startGame) {
      setScore(Math.min(score + 1, 1000));
      gameResult(score + 1);
    }
  }, [obstaclePosition, dinoPosition, gameOver, startGame]);

  // Handle retry button
  const handleRetry = () => {
    setIsJumping(false);
    setDinoPosition(0);
    setObstaclePosition(1000);
    setGameOver(false);
    setScore(0);
    gameResult(0);
    setStartGame(true);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-transparent pb-[-30em ]">
      {/* Black background should be visible behind the game only when running */}
      {startGame && !gameOver && (
        <div
          className="absolute inset-0 bg-black"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Score in the center, but at the top */}
      <div className="absolute mt-40 top-10 text-white text-2xl z-10">
        {startGame && !gameOver && `Score: ${score}`}
      </div>

      {startGame && !gameOver ? (
        <div className="relative mt-20 ml-[-8em] z-10">
          <img
            className="dino" 
            ref={dinoRef} 
            src='https://res.cloudinary.com/diswj8gya/image/upload/v1729122976/dino_rqzcd2.png'
            style={{ bottom: `${dinoPosition}px`, position: 'relative' }}
          />
          <img 
            className="obstacle" 
            src='https://res.cloudinary.com/diswj8gya/image/upload/v1729123092/cacac_srlfcs.png'
            style={{ left: `${obstaclePosition}px`, position: 'absolute', bottom: '0px' }}
          />
        </div>
      ) : gameOver ? (
        <div className="game-over bg-black p-4 rounded-lg text-white z-10">
          <h2>Game Over!</h2>
          <p>Your Score: {score}</p>
          <button className="bg-gray-700 p-2 rounded mt-4" onClick={handleRetry}>
            Retry
          </button>
        </div>
      ) : (
        <button className="start-btn bg-black text-white p-4 rounded-lg" onClick={() => setStartGame(true)}>
          Start Game
        </button>
      )}
    </div>
  );
}

export default Minigame15;
