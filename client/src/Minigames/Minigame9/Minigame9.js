// src/Game1.js
import React, { useEffect, useState, useRef } from 'react';
import './Game1.css'; // Import the CSS file

const Minigame9 = ({ gameResult }) => {
  const [timerDisplay, setTimerDisplay] = useState('Time: 0.0000 s');
  const [result, setResult] = useState('');
  const [pointsDisplay, setPointsDisplay] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [points, setPoints] = useState(0);
  const [color, setColor] = useState('#ffa406');
  const nextGameButtonRef = useRef(null);
  const boxRef = useRef(null);
  let startTime = useRef(null);
  let timeoutId = useRef(null);
  let timerInterval = useRef(null);

  // Effect to clean up timers on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
      clearInterval(timerInterval.current);
    };
  }, []);

  // Function to start the game
  const startGame = () => {
    // Reset game state
    setColor('#ffa406');
    setResult('');
    setPointsDisplay('');
    setGameEnded(false);

    // Start timer
    let currentTime = 0;
    setTimerDisplay(`Time: ${currentTime.toFixed(4)} s`);
    timerInterval.current = setInterval(() => {
      currentTime += 0.01;
      setTimerDisplay(`Time: ${currentTime.toFixed(4)} s`);
    }, 10);

    // Set random delay for color change
    const delay = Math.floor(Math.random() * 4000) + 3000;
    timeoutId.current = setTimeout(() => {
      setColor('#ff0000');
      startTime.current = new Date().getTime();
      clearInterval(timerInterval.current); // Stop timer when color changes
    }, delay);
  };

  const handleBoxClick = () => {
    if (gameEnded) return; // Prevent actions after game ends

    if (color === 'rgb(255, 0, 0)' || color === '#ff0000') {
      const endTime = new Date().getTime();
      const reactionTime = (endTime - startTime.current) / 1000;
      setResult(`Your reaction time is: ${reactionTime.toFixed(4)} seconds`);

      // Assign points based on the reaction time
      let earnedPoints = 0;
      if (reactionTime < 0.4) {
        earnedPoints = 100;
      } else if (reactionTime < 0.45) {
        earnedPoints = 80;
      } else if (reactionTime < 0.50) {
        earnedPoints = 60;
      } else if (reactionTime < 0.55) {
        earnedPoints = 50;
      } else if (reactionTime < 0.65) {
        earnedPoints = 30;
      } else if (reactionTime < 0.75) {
        earnedPoints = 10;
      } else {
        earnedPoints = 0;
      }

      setPoints(earnedPoints);
      gameResult(earnedPoints);
      setPointsDisplay(`You earned: ${earnedPoints} points`);
      setGameEnded(true); // Mark the game as ended
    } else {
      clearTimeout(timeoutId.current);
      clearInterval(timerInterval.current);
      setResult('Clicked too early! Wait for the color to change.');
      // No retries allowed, do not restart the game here
    }
  };

  // Handler for the start button
  const handleStartButton = () => {
    startGame();
  };

  return (
    <div id="game-container">
      <h1>Reaction Speed Tester</h1>
      <div id="timer">{timerDisplay}</div>
      <div
        id="box"
        ref={boxRef}
        style={{ backgroundColor: color }}
        onClick={handleBoxClick}
      >
        Click when color changes!
      </div>
      <div id="result">{result}</div>
      <div id="points">{pointsDisplay}</div>

      {/* Start Button */}
      {!gameEnded && (
        <div className="start-button-container">
          <button onClick={handleStartButton} className="start bg-white text-black p-1 m-1 rounded-md">
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Minigame9;
