import React, { useState, useEffect, useRef } from 'react';
import './Dino.css';

function Minigame15() {
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
      setScore((prevScore) => prevScore + 1);
    }
  }, [obstaclePosition, dinoPosition, gameOver, startGame]);

  // Handle retry button
  const handleRetry = () => {
    setIsJumping(false);
    setDinoPosition(0);
    setObstaclePosition(1000);
    setGameOver(false);
    setScore(0);
    setStartGame(true);
  };

  return (
    <div className="game-container">
      {startGame && !gameOver ? (
        <>
          <div 
            className="dino" 
            ref={dinoRef} 
            style={{ bottom: `${dinoPosition}px` }}>
          </div>
          <div 
            className="obstacle" 
            style={{ left: `${obstaclePosition}px` }}>
          </div>
          <div className="score">
            Score: {score}
          </div>
        </>
      ) : gameOver ? (
        <>
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Your Score: {score}</p>
            <button onClick={handleRetry}>Retry</button>
          </div>
        </>
      ) : (
        <button className="start-btn" onClick={() => setStartGame(true)}>
          Start Game
        </button>
      )}
    </div>
  );
}

export default Minigame15;
