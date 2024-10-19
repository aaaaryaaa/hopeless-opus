import React, { useState, useEffect } from "react";

// Function to generate a random math question
const generateQuestion = () => {
  const operations = ["+", "-", "*", "/"];
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let question;
  let correctAnswer;

  switch (operation) {
    case "+":
      question = `${num1} + ${num2}`;
      correctAnswer = num1 + num2;
      break;
    case "-":
      question = `${num1} - ${num2}`;
      correctAnswer = num1 - num2;
      break;
    case "*":
      question = `${num1} * ${num2}`;
      correctAnswer = num1 * num2;
      break;
    case "/":
      question = `${num1 * num2} / ${num1}`;
      correctAnswer = (num1 * num2) / num1; // Avoid fractions
      break;
    default:
      break;
  }

  return { question, correctAnswer };
};

const MathematicalDroplets = ({ gameResult }) => {
  const [questions, setQuestions] = useState([]); // Initialize with empty array
  const [answer, setAnswer] = useState("");
  const [dropletPositions, setDropletPositions] = useState({});
  const [speed, setSpeed] = useState(1); // Speed starts at 1 and can increase over time
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // 60 seconds game timer
  const [usedPositions, setUsedPositions] = useState([]); // To track used horizontal positions
  const [hasStarted, setHasStarted] = useState(false); // State to track if the game has started

  // Function to add a new question
  const addNewQuestion = () => {
    const { question, correctAnswer } = generateQuestion();
    let randomXPos;

    // Generate a random position and ensure it's unique
    do {
      randomXPos = Math.floor(Math.random() * 80); // Random position for each drop (0-80% from the left)
    } while (usedPositions.includes(randomXPos));

    const newQuestionId = questions.length
      ? questions[questions.length - 1].id + 1
      : 0;

    setQuestions((prev) => [
      ...prev,
      { question, correctAnswer, id: newQuestionId, xPos: randomXPos },
    ]);

    setDropletPositions((prev) => ({
      ...prev,
      [newQuestionId]: 0,
    }));

    // Track the used position
    setUsedPositions((prev) => [...prev, randomXPos]);
  };

  // Timer to trigger new drops every few seconds or when no questions are on screen
  useEffect(() => {
    const dropInterval = setInterval(() => {
      if (!isGameOver && questions.length < 10) {
        // Limit the number of questions on screen
        addNewQuestion();
      }
    }, 2000); // New questions appear every 2 seconds

    return () => clearInterval(dropInterval);
  }, [questions, isGameOver]);

  // Timer to track the game duration
  useEffect(() => {
    if (timeLeft === 0) {
      setIsGameOver(true);
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  // Move the droplets down the screen
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setDropletPositions((prevPositions) => {
        const newPositions = {};
        let gameOver = false;

        for (let id in prevPositions) {
          if (prevPositions[id] >= 90) {
            gameOver = true; // If droplet reaches bottom, end the game
          } else {
            newPositions[id] = prevPositions[id] + speed * 0.5; // Speed up gradually
          }
        }

        if (gameOver) {
          setIsGameOver(true);
        }

        return newPositions;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [speed, isGameOver]);

  // Handle when the correct answer is input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setAnswer(value);

    questions.forEach((q) => {
      if (parseInt(value) === q.correctAnswer) {
        // Correct answer found
        setScore((prev) => prev + 1);
        gameResult((score+1)*10);
        setDropletPositions((prev) => ({ ...prev, [q.id]: -100 })); // Move the correct droplet off-screen (pop effect)

        // Remove the popped question from the list
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== q.id)
        );

        // Clear the answer box
        setAnswer("");

        // Immediately add a new question if no questions left
        if (questions.length === 1) {
          addNewQuestion();
        }

        // Increase speed slightly, cap at 3
        setSpeed((prev) => Math.min(prev + 0.05, 3));
      }
    });
  };

  // Handle the start button click
  const handleStart = () => {
    setQuestions([]); // Clear previous questions
    setAnswer(""); // Clear previous answer
    setDropletPositions({}); // Clear droplet positions
    setSpeed(1); // Reset speed
    setScore(0); // Reset score
    setIsGameOver(false); // Reset game over state
    setTimeLeft(15); // Reset timer
    setUsedPositions([]); // Clear used positions
    setHasStarted(true); // Set the game to started
    addNewQuestion(); // Start the first question immediately
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-500">
      {!hasStarted ? ( // Show start button if the game hasn't started
        <button onClick={handleStart} className="px-6 py-3 bg-blue-800 text-white text-xl rounded-md">
          Start Game
        </button>
      ) : (
        <>
          {!isGameOver ? (
            <>
              <div className="text-4xl font-bold mb-4 text-white">Mathematical Droplets</div>

              {/* Timer */}
              <div className="text-xl text-white mb-4">Time Left: {timeLeft}s</div>

              {/* Droplet Container */}
              <div className="relative w-full h-96 bg-blue-200 rounded-lg overflow-hidden">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="absolute text-xl font-bold bg-blue-400 text-white p-6 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-out transform"
                    style={{
                      top: `${dropletPositions[q.id]}%`,
                      left: `${q.xPos}%`, // Random horizontal position
                      width: "120px",
                      height: "120px",
                      transition: "top 0.05s linear",
                    }}
                  >
                    {q.question}
                  </div>
                ))}

                {/* Puddle at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-blue-700 h-5 rounded-b-lg"></div>
              </div>

              {/* Single Input field for all answers */}
              <input
                type="text"
                value={answer}
                onChange={handleInputChange}
                className={`mt-8 px-4 py-2 rounded-md shadow-lg text-xl text-center ${
                  isGameOver ? "bg-gray-300" : ""
                }`} // Gray out input when game is over
                placeholder="Type your answer..."
                autoFocus
                disabled={isGameOver} // Disable input when game is over
              />

              {/* Score display */}
              <div className="mt-4 text-2xl text-white">Score: {score}</div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-white">
                Game Over! Your Score: {score}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MathematicalDroplets;
