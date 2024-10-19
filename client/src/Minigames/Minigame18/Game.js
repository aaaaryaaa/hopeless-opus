import React, { useState, useEffect } from 'react';
import Gate from './Gate';
import Scoreboard from './Scoreboard';
import Timer from './Timer';
import { generateCombinations } from './utils';

const Game = ({ gameResult }) => {
  const TOTAL_GATES = 5;
  const ROUND_TIME = 30; // seconds
  const switchCount = 4; // Update this if you change it in utils

  const [currentRound, setCurrentRound] = useState(1);
  const [combinations, setCombinations] = useState([]);
  const [userSwitches, setUserSwitches] = useState(Array(switchCount).fill(false));
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(ROUND_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // New state for start button
  const [wonGame, setWonGame] = useState(false);

  // Generate combinations on game start
  useEffect(() => {
    const combos = generateCombinations(TOTAL_GATES);
    setCombinations(combos);
  }, []);

  // Timer logic
  useEffect(() => {
    if (!hasStarted || timer === 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      setGameOver(true); // Set game over when time runs out
      setHasStarted(false); // Stop the game
    }

    return () => clearInterval(countdown);
  }, [timer, hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
    setTimer(ROUND_TIME);
    setGameOver(false);
  };

  const handleToggle = (index) => {
    const updatedSwitches = [...userSwitches];
    updatedSwitches[index] = !updatedSwitches[index];
    setUserSwitches(updatedSwitches);
    setMoves((prev) => prev + 1);

    const currentCombination = combinations[currentRound - 1];
    if (arraysEqual(updatedSwitches, currentCombination)) {
      const pointsEarned = Math.max(100 - moves * 10, 0);
      setScore((prev) => prev + pointsEarned);
      handleRoundEnd();
    }
  };

  const handleRoundEnd = () => {
    if (timer === 0) {
      setGameOver(true); // End the game if the time runs out
      gameResult(score, false);
      return;
    }
    if (currentRound < TOTAL_GATES) {
      setCurrentRound((prev) => prev + 1);
      setUserSwitches(Array(switchCount).fill(false));
      setMoves(0);
      setTimer(ROUND_TIME);
    } else {
      alert(`Game Over! Your score: ${score}`);
      gameResult(score, true);
      resetGame();
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setUserSwitches(Array(switchCount).fill(false));
    setMoves(0);
    setScore(0);
    setTimer(ROUND_TIME);
    setHasStarted(false);
    setGameOver(false);
    setCombinations(generateCombinations(TOTAL_GATES));
  };

  const arraysEqual = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Game not started yet */}
      {!hasStarted && !gameOver ? (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Ready to Play?</h1>
          <button
            onClick={handleStart}
            className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          >
            Start Game
          </button>
        </div>
      ) : gameOver ? (
        // Game over screen when the time runs out
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-red-600">Game Over!</h1>
          <p className="text-xl mt-4">Time's up. The monster caught you!</p>
          <p className="text-2xl mt-4">Final Score: {score}</p>
        </div>
      ) : (
        // Game UI when the game is active
        <>
          <Scoreboard score={score} currentRound={currentRound} />
          <Timer time={timer} />
          <Gate switches={userSwitches} onToggle={handleToggle} />
          <div className="mt-4 flex justify-center text-lg">Moves: {moves}</div>
        </>
      )}
    </div>
  );
  
};

export default Game;
