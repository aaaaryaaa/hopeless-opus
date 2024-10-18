import React, { useState } from "react";
import "./Minigame10.css";


// Sample questions and answers for each level (6 levels)
const questions = [
  {
    question: "How many water bottles did the stranger ask for at the shop?",
    options: ["11", "18", "7", "14"],
    correctIndex: 2,
  },
  // {
  //   question: "What symbol does the pocket watch have?",
  //   options: ["Phoenix", "Illuminati", "Tiger", "Pyramid"],
  //   correctIndex: 0,
  // },
  // {
  //   question: "What is the number of libraries the campus has?",
  //   options: ["2", "4", "1", "3"],
  //   correctIndex: 3,
  // },
  // {
  //   question: "Total number of workshops the campus has?",
  //   options: ["6", "7", "5", "9"],
  //   correctIndex: 1,
  // },
  {
    question: "Let x be the number of libraries and y be the number of sports fields on the campus, what is (19 * x) + (58 * y)?",
    options: ["410", "533", "405", "672"],
    correctIndex: 2,
  },
  {
    question: "Which among the following was not asked in the previous round?",
    options: ["Function of a compiler", "Moon rover", "Green revolution", "Numerical pattern question"],
    correctIndex: 2,
  },
  {
    question: "In the family photo you found, what members of the family were there?",
    options: ["Father, mother, two daughters, one son", "Father, mother, two daughters", "Father, mother, one son, one daughter", "Father, mother, two sons, one daughter"],
    correctIndex: 1,
  },
  {
    question: "What years did the file you found in the library have details about?",
    options: ["2013, 2002", "2014, 2002", "2013, 2003", "2014, 2003"],
    correctIndex: 0,
  },
  // {
  //   question: "Where was the conference held?",
  //   options: ["Library conference hall", "MV seminar hall", "AB5 210", "AB1 quadrangle"],
  //   correctIndex: 1,
  // },
  {
    question: "How old was the prime suspect?",
    options: ["22", "23", "27", "25"],
    correctIndex: 3,
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

const Minigame10 = ({gameResult}) => {
  const [currentRow, setCurrentRow] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const [previousAnswers, setPreviousAnswers] = useState([]);
  const [score, setScore] = useState(100); // Start with 100 points

  const currentQuestion = questions[currentRow];

  const handleTileClick = (index) => {
    if (answeredCorrectly === null) {
      if (index === currentQuestion.correctIndex) {
        setAnsweredCorrectly(true);
        setPreviousAnswers((prev) => [...prev, currentQuestion]);
  
        setTimeout(() => {
          // Check if the next row is within the bounds of the questions array
          if (currentRow + 1 < questions.length) {
            setCurrentRow(currentRow + 1);
          }
          setAnsweredCorrectly(null);
        }, 1000);
      } else {
        setAnsweredCorrectly(false);
        setScore((prev) => Math.max(prev - 10, 0)); // Deduct points for wrong answer
        gameResult(Math.max(score - 10, 0));
  
        setTimeout(() => setAnsweredCorrectly(null), 1000);
      }
    }
  };
  

  return (
    <div className="game-container">
      <div
  className="question-container"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center"
  }}
>
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
                  isAnsweredCorrectly={previousAnswers.some(prev => prev === question) ? true : answeredCorrectly}
                  isTextVisible={currentRow === questions.length - 1 - rowIndex} // Show text only for the current question
                />
              ))}
            </div>
          ))}
      </div>
      <div className="score-container">
        <h2 className="p-4 pr-8">Score: {score}</h2> {/* Display score */}
      </div>
    </div>
  );
};

export default Minigame10;
