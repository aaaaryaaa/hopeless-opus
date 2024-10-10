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

  useEffect(() => {
    startGame();
    return () => {
      clearTimeout(timeoutId.current);
      clearInterval(timerInterval.current);
    };
  }, []);

  const startGame = () => {
    // Reset game state
    setColor('#ffa406');
    setResult('');
    setPointsDisplay('');
    setGameEnded(false);
    nextGameButtonRef.current.style.display = 'none';

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
    if (gameEnded) return;

    if (color === 'rgb(255, 0, 0)' || color === '#ff0000') {
      const endTime = new Date().getTime();
      const reactionTime = (endTime - startTime.current) / 1000;
      setResult(`Your reaction time is: ${reactionTime.toFixed(4)} seconds`);

      // Assign points based on the reaction time
      let earnedPoints = 0;
      if (reactionTime < 0.3) {
        earnedPoints = 100;
      } else if (reactionTime < 0.5) {
        earnedPoints = 70;
      } else if (reactionTime < 0.65) {
        earnedPoints = 60;
      } else if (reactionTime < 0.7) {
        earnedPoints = 50;
      } else if (reactionTime < 1) {
        earnedPoints = 30;
      } else {
        earnedPoints = 0;
      }

      setPoints(earnedPoints);
      gameResult(earnedPoints);
      setPointsDisplay(`You earned: ${earnedPoints} points`);
      setGameEnded(true);
      nextGameButtonRef.current.style.display = 'block'; // Show Next Game button
    } else {
      clearTimeout(timeoutId.current);
      clearInterval(timerInterval.current);
      setResult('Clicked too early! Wait for the color to change.');
      startGame(); // Restart the game
    }
  };

  const goToHomePage = () => {
    window.location.href = ''; // Redirect to homepage or desired URL
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
      <div className="center">
        <button
          id="next-game-button"
          ref={nextGameButtonRef}
          style={{ display: 'none' }}
          onClick={goToHomePage}
        >
          NEXT GAME
        </button>
      </div>
    </div>
  );
};

export default Minigame9;
