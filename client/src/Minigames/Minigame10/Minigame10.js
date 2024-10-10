import React, { useState } from "react";
import "./Minigame10.css";

// Sample questions and answers for each level (6 levels)
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid"],
    correctIndex: 1,
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "12", "15"],
    correctIndex: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter"],
    correctIndex: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific"],
    correctIndex: 2,
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Silver"],
    correctIndex: 0,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Tolstoy"],
    correctIndex: 0,
  },
];

const Tile = ({ text, onClick, isActive, isAnsweredCorrectly, isTextVisible }) => {
  return (
    <div
      className={`tile ${isActive ? "active" : ""} ${
        isAnsweredCorrectly === true
          ? "correct"
          : isAnsweredCorrectly === false
          ? "incorrect"
          : ""
      }`}
      onClick={onClick}
    >
      {isTextVisible ? text : ""}
    </div>
  );
};

const Game = () => {
  const [currentRow, setCurrentRow] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null); // Track correct/incorrect feedback

  const currentQuestion = questions[currentRow];

  const handleTileClick = (index) => {
    if (answeredCorrectly === null) {
      if (index === currentQuestion.correctIndex) {
        setAnsweredCorrectly(true);
        setTimeout(() => {
          setCurrentRow(currentRow + 1);
          setAnsweredCorrectly(null);
        }, 1000); // Move to next row after showing correct feedback
      } else {
        setAnsweredCorrectly(false);
        setTimeout(() => setAnsweredCorrectly(null), 1000); // Reset feedback after a wrong answer
      }
    }
  };

  return (
    <div className="game-container">
      <div className="question-container">
        <h2>{currentQuestion.question}</h2>
      </div>
      <div className="grid-container">
        {/* Display all tiles in a grid in reverse order */}
        {questions
          .slice()
          .reverse()
          .map((question, rowIndex) => (
            <div className="tile-row" key={rowIndex} style={{ display: "flex" }}>
              {question.options.map((option, index) => (
                <Tile
                  key={index}
                  text={option}
                  onClick={() => handleTileClick(index)}
                  isActive={currentRow === questions.length - 1 - rowIndex && answeredCorrectly === null}
                  isAnsweredCorrectly={answeredCorrectly}
                  isTextVisible={currentRow === questions.length - 1 - rowIndex} // Show text only for the current question
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
};

export default App;
