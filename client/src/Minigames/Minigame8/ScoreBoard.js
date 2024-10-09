// src/components/ScoreBoard.js
import React from "react";

const ScoreBoard = ({ score, timeLeft }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold text-white">Score: {score}</h2>
      <h3 className="text-xl text-gray-200">Time Left: {timeLeft}s</h3>
    </div>
  );
};

export default ScoreBoard;
