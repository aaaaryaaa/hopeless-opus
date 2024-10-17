import React, { useState, useEffect } from 'react';

const Minigame14 = ({ gameResult }) => {
  // Morse code question and the correct answer
  const correctAnswer = "IN A QUIET AFFLUENT NEIGHBOURHOOD";
  const morseCodeQuestion = ".. -. / .- / --.- ..- .. . - / .- ..-. ..-. .-.. ..- . -. - / -. . .. --. .... -... --- ..- .-. .... --- --- -..";

  // React state variables
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [hasStarted, setHasStarted] = useState(false); // New state for tracking game start

  // Timer effect hook
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver && hasStarted) {
      const timer = setInterval(() => setTimeLeft((prevTimeLeft) => prevTimeLeft - 1), 1000);
      return () => clearInterval(timer); // Clear timer on component unmount
    } else if (timeLeft === 0 && !isGameOver) {
      checkAnswer(); // Auto-check answer when time is up
    }
  }, [timeLeft, isGameOver, hasStarted]);

  // Handle the input change
  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Function to check the answer
  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage("Correct! You win!");
      gameResult(100, true);
    } else {
      setMessage(`Game Over! Incorrect answer.`);
      gameResult(-50, false);
    }
    setIsGameOver(true); // End the game
  };

  // Handle the submit button click
  const handleSubmit = () => {
    checkAnswer();
  };

  // Handle the start button click
  const handleStart = () => {
    setUserAnswer('');
    setTimeLeft(30);
    setIsGameOver(false);
    setMessage('');
    setHasStarted(true); // Set the game to started
  };

  return (
    <div style={styles.container}>
      {!hasStarted ? ( // Show start button if the game hasn't started
        <button onClick={handleStart} style={styles.startButton}>
          Start Game
        </button>
      ) : (
        <>
          {!isGameOver ? (
            <>
              <div style={styles.question}>{morseCodeQuestion}</div>
              <input
                type="text"
                value={userAnswer}
                onChange={handleChange}
                placeholder="Type your answer here"
                style={styles.input}
              />
              <br />
              <button onClick={handleSubmit} style={styles.button}>
                Submit
              </button>
              <div style={styles.timer}>Time left: {timeLeft}s</div>
            </>
          ) : (
            <div style={styles.message}>{message}</div>
          )}
        </>
      )}
    </div>
  );
};

// Basic styles for the component
const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: "rgba(75, 85, 99, 0.7)", 
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  question: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '300px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
  },
  startButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  message: {
    fontSize: '18px',
    marginTop: '20px',
  },
  timer: {
    fontSize: '18px',
    color: 'red',
  },
};

export default Minigame14;
