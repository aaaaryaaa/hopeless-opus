import React, { useState, useEffect } from 'react';

const MorseCodeQuiz = () => {
  // Morse code question and the correct answer
  const correctAnswer = "In a Quiet, Affluent Neighbourhood";
  const morseCodeQuestion = ".. -. / .- / --.- ..- .. . - / .- ..-. ..-. .-.. ..- . -. - / -. . .. --. .... -... --- ..- .-. .... --- --- -..";

  // React state variables
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');

  // Timer effect hook
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer); // Clear timer on component unmount
    } else if (timeLeft === 0 && !isGameOver) {
      checkAnswer(); // Auto-check answer when time is up
    }
  }, [timeLeft, isGameOver]);

  // Handle the input change
  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Function to check the answer
  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage("Correct!");
    } else {
      setMessage(`Incorrect! `);
    }
    setIsGameOver(true); // End the game
  };

  // Handle the submit button click
  const handleSubmit = () => {
    checkAnswer();
  };

  return (
    <div style={styles.container}>
      <div style={styles.question}>{morseCodeQuestion}</div>
      <input
        type="text"
        value={userAnswer}
        onChange={handleChange}
        disabled={isGameOver}
        placeholder="Type your answer here"
        style={styles.input}
      />
      <br />
      <button onClick={handleSubmit} disabled={isGameOver} style={styles.button}>
        Submit
      </button>
      <div style={styles.message}>{message}</div>
      <div style={styles.timer}>Time left: {timeLeft}s</div>
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
  message: {
    fontSize: '18px',
    marginTop: '20px',
  },
  timer: {
    fontSize: '18px',
    color: 'red',
  },
};

export default MorseCodeQuiz;
