import React, { useState, useEffect, useRef } from 'react';
import boat from "./boat.png";
import stone from "./stone.png";

const initialObstacleGenerationInterval = 500; // Faster obstacle generation
const gameDuration = 60000; // 1 minute
const stopObstacleGenerationTime = 52000; // 52 seconds
const fadeOutStartTime = 0; // Start fading out the land at the beginning
const fadeInStartTime = gameDuration - 5000; // Start fading in the land in the last 5 seconds
const maxRetries = 2; // Maximum number of retries allowed

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
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started
  const [restartAttempts, setRestartAttempts] = useState(0); // Track the number of restarts
  const [lost, setLost] = useState(false); // Track if the player has lost

  const canvasRef = useRef(null);
  const gameStartTime = useRef(Date.now());

  // New refs for the boat and rock images
  const boatRef = useRef(null);
  const rockRef = useRef(null);

  // Load the boat and rock images
  useEffect(() => {
    const boatImage = new Image();
    const rockImage = new Image();
    
    boatImage.src = `${boat}` // Update this with the actual path to the boat image
    rockImage.src = `${stone}`; // Update this with the actual path to the rock image

    boatRef.current = boatImage;
    rockRef.current = rockImage;
  }, []);

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize({ width: window.innerWidth * 0.9, height: window.innerHeight });
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
      if (!gameOver && !gameCompleted && gameStarted) {
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
  }, [gameOver, gameCompleted, canvasSize, obstacleGenerationInterval, gameStarted]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && !gameCompleted && boatRef.current && rockRef.current && gameStarted) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw player (replace rectangle with boat image)
        ctx.drawImage(boatRef.current, playerX, canvasSize.height - 90, 80, 40); // Adjust as necessary

        // Draw obstacles (replace rectangle with rock image)
        const newObstacles = obstacles
          .map((obstacle) => ({
            ...obstacle,
            y: obstacle.y + obstacleSpeed,
          }))
          .filter((obstacle) => obstacle.y < canvasSize.height);

        newObstacles.forEach((obstacle) => {
          ctx.drawImage(rockRef.current, obstacle.x, obstacle.y, 40, 40); // Adjust size as needed

          // Check collision
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

        // Speed up obstacle generation after 30 seconds
        if (elapsedTime >= 30000 && obstacleGenerationInterval === initialObstacleGenerationInterval) {
          setObstacleGenerationInterval(initialObstacleGenerationInterval / 1.5);
        }

        if (elapsedTime >= gameDuration) {
          setGameCompleted(true);
          if(!lost) gameResult(200);
          gameResult(0);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [obstacles, playerX, gameOver, gameCompleted, canvasSize, obstacleSpeed, obstacleGenerationInterval, gameStarted]);

  const resetGame = () => {
    if (restartAttempts < maxRetries) {
      setPlayerX(canvasSize.width / 2);
      setObstacles([]);
      setGameOver(false);
      setGameCompleted(false);
      setObstacleSpeed(5);
      setObstacleGenerationInterval(initialObstacleGenerationInterval);
      setShowLand(true);
      setShowEndLand(false);
      gameStartTime.current = Date.now();
      setRestartAttempts(restartAttempts + 1); // Increment restart attempts
    } else {
      setLost(true); // Set the player as lost after max retries
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerX, canvasSize]);

  const startGame = () => {
    setGameStarted(true);
    gameStartTime.current = Date.now();
  };

  return (
    <div className="gameApp flex flex-col justify-center items-center">
      {!gameStarted && !lost && (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
        >
          Start Game
        </button>
      )}

      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="block w-[70vw] h-[80vh] bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg transition-all duration-300"
      />

      {/* Land gradients */}
      {showLand && (
        <div className="absolute bottom-0 w-[70vw] h-[16vh] bg-gradient-to-b from-blue-400 to-yellow-700 opacity-100 transition-opacity duration-700 ease-in"></div>
      )}
      {showEndLand && (
        <div className="absolute top-0 w-[70vw] h-[16vh] bg-gradient-to-b from-yellow-700 to-blue-400 opacity-100 transition-opacity duration-700 ease-out"></div>
      )}

      

      {lost && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-6 rounded-lg z-50 shadow-2xl text-lg transition-transform duration-300 ease-in-out">
          <p className="mb-4">You've lost the game!</p>
        </div>
      )}

      {/* Game over or success messages */}
      {gameOver && !lost && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-6 rounded-lg z-50 shadow-2xl text-lg transition-transform duration-300 ease-in-out">
          <p className="mb-4">Game Over!</p>
          {restartAttempts < maxRetries ? (
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
            >
              Restart ({restartAttempts + 1}/{maxRetries})
            </button>
          ) : null}
        </div>
      )}
      {gameCompleted && !lost && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-6 rounded-lg z-50 shadow-2xl text-lg transition-transform duration-300 ease-in-out">
          River crossed successfully!
        </div>
      )}
    </div>
  );
}

export default Minigame11;
