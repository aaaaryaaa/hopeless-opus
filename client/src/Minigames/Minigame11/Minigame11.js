import React, { useState, useEffect, useRef } from 'react';
import './Minigame11.css';

const initialObstacleGenerationInterval = 400;
const gameDuration = 60000; // 1 minute
const stopObstacleGenerationTime = 52000; // 52 seconds
const fadeOutStartTime = 0; // Start fading out the land at the beginning
const fadeInStartTime = gameDuration - 5000; // Start fading in the land in the last 5 seconds

function Minigame11({ gameResult }) {
  const [playerX, setPlayerX] = useState(150);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showLand, setShowLand] = useState(true); // Control the land gradient
  const [showEndLand, setShowEndLand] = useState(false); // Control the end land gradient
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [obstacleSpeed, setObstacleSpeed] = useState(5);
  const [obstacleGenerationInterval, setObstacleGenerationInterval] = useState(initialObstacleGenerationInterval);
  const canvasRef = useRef(null);
  const gameStartTime = useRef(Date.now());

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize({ width: window.innerWidth*0.9, height: window.innerHeight });
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setPlayerX((prevX) => Math.max(0, prevX - 20));
    } else if (e.key === 'ArrowRight') {
      setPlayerX((prevX) => Math.min(canvasSize.width - 40, prevX + 20));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && !gameCompleted) {
        const elapsedTime = Date.now() - gameStartTime.current;

        // Handle land gradient fade-out
        if (elapsedTime >= fadeOutStartTime && elapsedTime <= 10000) {
          setShowLand(true);
        } else {
          setShowLand(false);
        }

        // Handle land gradient fade-in during the last 5 seconds
        if (elapsedTime >= fadeInStartTime) {
          setShowEndLand(true);
        }

        // Stop generating obstacles after 52 seconds
        if (elapsedTime >= stopObstacleGenerationTime) {
          return;
        }

        const numObstacles = Math.floor(Math.random() * 2) + 1;
        const newObstacles = [];

        for (let i = 0; i < numObstacles; i++) {
          const randomX = Math.floor(Math.random() * (canvasSize.width - 40));
          newObstacles.push({ x: randomX, y: 0 });
        }

        setObstacles((prevObstacles) => [...prevObstacles, ...newObstacles]);
      }
    }, obstacleGenerationInterval);

    return () => clearInterval(interval);
  }, [gameOver, gameCompleted, canvasSize, obstacleGenerationInterval]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && !gameCompleted) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'blue';
        ctx.fillRect(playerX, canvasSize.height - 50, 40, 40);

        const newObstacles = obstacles.map((obstacle) => ({
          ...obstacle,
          y: obstacle.y + obstacleSpeed,
        })).filter((obstacle) => obstacle.y < canvasSize.height);

        newObstacles.forEach((obstacle) => {
          ctx.fillStyle = 'red';
          ctx.fillRect(obstacle.x, obstacle.y, 40, 40);

          if (
            obstacle.y > canvasSize.height - 100 &&
            obstacle.y < canvasSize.height - 50 &&
            obstacle.x < playerX + 40 &&
            obstacle.x + 40 > playerX
          ) {
            setGameOver(true);
          }
        });

        setObstacles(newObstacles);

        const elapsedTime = Date.now() - gameStartTime.current;
        setObstacleSpeed(5 + Math.floor(elapsedTime / 10000));

        if (elapsedTime >= 30000 && obstacleGenerationInterval === initialObstacleGenerationInterval) {
          setObstacleGenerationInterval(initialObstacleGenerationInterval / 2);
        }

        if (elapsedTime >= gameDuration) {
          setGameCompleted(true);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [obstacles, playerX, gameOver, gameCompleted, canvasSize, obstacleSpeed, obstacleGenerationInterval]);

  const resetGame = () => {
    setPlayerX(canvasSize.width / 2);
    setObstacles([]);
    setGameOver(false);
    setGameCompleted(false);
    setObstacleSpeed(5);
    setObstacleGenerationInterval(initialObstacleGenerationInterval);
    setShowLand(true);
    setShowEndLand(false);
    gameStartTime.current = Date.now();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerX, canvasSize]);

  return (
    <div className="gameApp">
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />

      {showLand && <div className="land-gradient"></div>}
      {showEndLand && <div className="land-gradient-end"></div>}

      {gameOver && <div className="game-over">Game Over! <button onClick={resetGame}>Restart</button></div>}
      {gameCompleted && <div className="game-over">River crossed successfully!</div>}
    </div>
  );
}

export default Minigame11;
