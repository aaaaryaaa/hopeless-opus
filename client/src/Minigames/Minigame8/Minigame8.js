// src/App.js
import React, { useState, useEffect } from "react";
import ExpressionBox from "./ExpressionBox";
import ScoreBoard from "./ScoreBoard";
import "../../index.css";

const Minigame8 = ({ gameResult }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [expression1, setExpression1] = useState("");
  const [expression2, setExpression2] = useState("");
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const generateExpressions = () => {
    const num1 = Math.floor(Math.random() * 5) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    const operator1 = Math.random() < 0.5 ? "+" : "-";
    const operator2 = Math.random() < 0.5 ? "*" : "/";

    const expr1 = `${num1} ${operator1} ${num2} ${operator2} ${num1}`;
    const expr2 = `${num2} ${operator1} ${num1} ${operator2} ${num2 + 1}`;

    setExpression1(expr1);
    setExpression2(expr2);
  };

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            setGameOver(true);
            setGameActive(false);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const evaluateExpression = (expr) => {
    try {
      return eval(expr);
    } catch (e) {
      return null;
    }
  };

  const handleClickEqual = () => {
    const value1 = evaluateExpression(expression1);
    const value2 = evaluateExpression(expression2);
    if (value1 === value2) {
      setScore(score + 10); // Correct answer
    } else {
      setScore(score - 5); // Wrong answer
    }
    generateExpressions();
  };

  const handleClickGreater = () => {
    const value1 = evaluateExpression(expression1);
    const value2 = evaluateExpression(expression2);
    if (value1 > value2) {
      setScore(score + 10); // Correct answer
      gameResult(score+10);
    } else {
      setScore(score - 5); // Wrong answer
      gameResult(score-5);
    }
    generateExpressions();
  };

  const handleClickLesser = () => {
    const value1 = evaluateExpression(expression1);
    const value2 = evaluateExpression(expression2);
    if (value1 < value2) {
      setScore(score + 10); // Correct answer
      gameResult(score+10);
    } else {
      setScore(score - 10); // Wrong answer
      gameResult(score-10);
    }
    generateExpressions();
  };

  const handleStartGame = () => {
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    generateExpressions();
  };

  const handleRestartGame = () => {
    setGameActive(false);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
  };

  return (
    <div className="app flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-4">
      <h1 className="text-4xl font-bold mb-2 text-white">Math Speed Game</h1>

      {/* Description of the game */}
      <p className="text-lg text-white text-center mb-6 max-w-md">
        Compare two mathematical expressions and select whether the left one is
        <span className="font-bold"> Greater, Lesser,</span> or{" "}
        <span className="font-bold">Equal</span> to the right one. Gain points
        for correct answers, but lose points for wrong ones. You have 30 seconds
        to score as high as you can!
      </p>

      {!gameActive && !gameOver && (
        <button
          className="p-4 w-1/3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      )}

      {gameActive && (
        <>
          <ScoreBoard score={score} timeLeft={timeLeft} />
          <ExpressionBox
            expression1={expression1}
            expression2={expression2}
            onClickGreater={handleClickGreater}
            onClickLesser={handleClickLesser}
          />
          <button
            className="mt-4 p-4 w-1/3 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition duration-300"
            onClick={handleClickEqual}
          >
            Equal
          </button>
        </>
      )}

      {gameOver && (
        <>
          <h2 className="text-3xl text-white mt-6">
            Game Over! Final Score: {score}
          </h2>
          <button
            className="mt-4 p-4 w-1/3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
            onClick={handleRestartGame}
          >
            Restart Game
          </button>
        </>
      )}
    </div>
  );
};

export default Minigame8;
