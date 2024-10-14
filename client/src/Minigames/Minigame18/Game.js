// src/components/Game.jsx
import React, { useState, useEffect } from 'react';
import Gate from './Gate';
import Scoreboard from './Scoreboard';
import Timer from './Timer';
import { generateCombinations } from './utils'; 

const Game = () => {
  const TOTAL_GATES = 5;
  const ROUND_TIME = 30; // seconds
  const switchCount = 4; // Update this if you change it in utils

  const [currentRound, setCurrentRound] = useState(1);
  const [combinations, setCombinations] = useState([]);
  const [userSwitches, setUserSwitches] = useState(Array(switchCount).fill(false));
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(ROUND_TIME);
  const [gameOver, setGameOver] = useState(false); // New state for game over

  useEffect(() => {
    const combos = generateCombinations(TOTAL_GATES);
    setCombinations(combos);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleRoundEnd(); // Call this to end the game if time runs out
      return;
    }

    const countdown = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleToggle = (index) => {
    const updatedSwitches = [...userSwitches];
    updatedSwitches[index] = !updatedSwitches[index];
    setUserSwitches(updatedSwitches);
    setMoves(prev => prev + 1);

    const currentCombination = combinations[currentRound - 1];
    if (arraysEqual(updatedSwitches, currentCombination)) {
      const pointsEarned = Math.max(100 - (moves * 10), 0);
      setScore(prev => prev + pointsEarned);
      handleRoundEnd();
    }
  };

  const handleRoundEnd = () => {
    if (timer === 0) {
      // End the game if time runs out
      setGameOver(true);
      return;
    }
    if (currentRound < TOTAL_GATES) {
      setCurrentRound(prev => prev + 1);
      setUserSwitches(Array(switchCount).fill(false));
      setMoves(0);
      setTimer(ROUND_TIME);
    } else {
      alert(`Game Over! Your score: ${score}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setUserSwitches(Array(switchCount).fill(false));
    setMoves(0);
    setScore(0);
    setTimer(ROUND_TIME);
    setGameOver(false); // Reset game over state
    setCombinations(generateCombinations(TOTAL_GATES));
  };

  const arraysEqual = (a1, a2) => {
    return JSON.stringify(a1) === JSON.stringify(a2);
  };

  return (
    <div className="p-4">
      {gameOver ? (
        <div className="text-2xl font-bold text-red-500 text-center mt-10">
          Game Over! The monster caught up to you!
        </div>
      ) : (
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