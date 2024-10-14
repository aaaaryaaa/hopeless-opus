import React, { useState, useEffect, useCallback } from 'react';
import './Wordle.css';

const WORD_LIST = ["FABLE", "MAJOR", "STONY", "RAINY", "CLUEY", "TEXTS", "SCARE", "FIRST", "TIMED", "DEPTH", 
  "ASHES", "FIREY", "CYCLE", "GUARD", "BOWED", "FINDY", "FUNDS", "BLOOD", "QUEST", "PARTY", 
  "FAILS", "RIOT", "CRYPT", "FLARE", "SHADE", "BREAK", "GAZE", "CLOCK", "MOB", "BUCKS", "SHIFT", 
  "EMBER", "CAVE", "CHILL", "RALLY", "FLASH", "WHISP", "PROBE", "COVER", "SMELL", "SCORE", 
  "RIDEY", "REALM", "HITCH", "GREEN", "CRUDE", "DARKY", "CHAIN", "GANGY", "FLOCK", "GRAD", 
  "CHESS", "BIKE", "BRAIN", "FEARY", "GLOOM", "GAMES", "EERIE", "SCAN", "LOGIC", "SPEED", 
  "CASHY", "CLASS", "TRAIL", "HASTY", "WRITE", "GRIMY", "DREAD", "HAUNT", "BRAKE", "RICHY", 
  "TENSE", "GEARS", "CLUES", "STUDY", "PASTY", "DIARY", "TREND", "SCARY", "GUNKY", "ROCKY", 
  "GHOUL", "VAGUE", "EPOCH", "BUMPY", "COINS", "HONOR", "YOUTH", "CHRON", "GLINT", "OMINY", 
  "NOTES", "ADATE", "LOGS", "MONEY", "ESSAY"];

const MAX_GUESSES = 6; // Maximum number of guesses allowed

const Wordle = ({ gameResult }) => {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [targetWord, setTargetWord] = useState('');
  const [message, setMessage] = useState('');
  const [absentLetters, setAbsentLetters] = useState(new Set());
  const [points, setPoints] = useState(0); // Track points
  const [validWords, setValidWords] = useState([]); // Store valid words

  useEffect(() => {
    // Fetch valid words from valid_words.txt
    fetch('./valid_words.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Get the content as text
      })
      .then(data => {
        // Convert the text to an array of words
        const wordList = data.split('\n').map(word => word.trim().toUpperCase());
        setValidWords(wordList); // Store the words in the state
      })
      .catch(error => console.error('Error fetching words:', error));
  
    // Select a random target word when the component mounts
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(randomWord);
  }, []);

  const handleChange = useCallback((letter) => {
    if (guess.length < 5) {
      setGuess((prev) => prev + letter.toUpperCase());
    }
  }, [guess]);

  const handleDelete = useCallback(() => {
    setGuess((prev) => prev.slice(0, -1));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  
    if (guess.length !== 5) {
      setMessage('Guess must be 5 letters long.');
      return;
    }
  
    const upperGuess = guess.toUpperCase();
  
    if (!validWords.includes(upperGuess)) {
      setMessage('Invalid word.');
      return;
    }
  
    setGuesses([...guesses, upperGuess]);
    setMessage('');
  
    const newAbsentLetters = new Set(absentLetters);
    upperGuess.split('').forEach((letter) => {
      if (!targetWord.includes(letter)) {
        newAbsentLetters.add(letter);
      }
    });
    setAbsentLetters(newAbsentLetters);
  
    if (upperGuess === targetWord) {
      const score = 100 - guesses.length * 10; // Points calculation
      setPoints(score);
      gameResult(score, true);
      setMessage(`Congratulations! You guessed the word and earned ${score} points!`);
    } else if (guesses.length === MAX_GUESSES - 1) {
      setMessage(`Game over! The word was ${targetWord}. You earned 0 points.`);
      setPoints(0); // No points if the player fails to guess
      gameResult(0, false);
    }
  
    setGuess('');
  }, [guess, guesses, validWords, targetWord, absentLetters]);

  useEffect(() => {
    // Add keyboard event listener for direct typing
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
  
      if (event.key === 'Backspace') {
        handleDelete();
        event.preventDefault(); // Prevent Backspace from typing into the input
      } else if (event.key === 'Enter') {
        handleSubmit(event);
        event.preventDefault(); // Prevent Enter from typing into the input
      } else if (key >= 'A' && key <= 'Z' && guess.length < 5) {
        handleChange(key);
        event.preventDefault(); // Ensure only letters are typed
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [guess, handleChange, handleDelete, handleSubmit]);

  const renderGuesses = () => {
    return Array.from({ length: MAX_GUESSES }, (_, index) => {
      const currentGuess = guesses[index] || '';
      const targetLetterCount = {}; 

      targetWord.split('').forEach(letter => {
        targetLetterCount[letter] = (targetLetterCount[letter] || 0) + 1;
      });

      const result = Array.from({ length: 5 }, (_, i) => {
        const letter = currentGuess[i] || ''; 
        let className = 'letter';

        if (letter && targetWord[i] === letter) {
          className += ' correct';
          targetLetterCount[letter]--;
        }

        return { letter, className };
      });

      result.forEach((entry, i) => {
        if (!entry.className.includes('correct') && targetWord.includes(entry.letter)) {
          if (targetLetterCount[entry.letter] > 0) {
            entry.className += ' present';
            targetLetterCount[entry.letter]--;
          } else {
            entry.className += ' absent';
          }
        } else if (!entry.className.includes('correct')) {
          entry.className += ' absent';
        }
      });

      return (
        <div key={index} className="guess-row">
          {result.map((entry, i) => (
            <span key={i} className={entry.className}>
              {entry.letter}
            </span>
          ))}
        </div>
      );
    });
  };

  const renderKeyboard = () => {
    const keyboardLayout = [
      
    ];

    return (
      <div className="keyboard">
        {keyboardLayout.map((row, index) => (
          <div key={index} className="keyboard-row">
            {row.split('').map((letter) => {
              const isAbsent = absentLetters.has(letter);
              return (
                <button
                  key={letter}
                  className={`key ${isAbsent ? 'absent' : ''}`}
                  onClick={() => handleChange(letter)}
                  disabled={isAbsent} // Disable button for absent letters
                >
                  {letter}
                </button>
              );
            })}
            {index === 1 && (
              <button className="key delete" onClick={handleDelete}>
                DEL
              </button>
            )}
          </div>
        ))}
        <div className="keyboard-row">
          <button className="key submit" onClick={handleSubmit}>
            ENTER
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="wordle">
      <h1>Wordle Game</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          readOnly
          placeholder="Enter your guess"
          className="guess-input"
        />
      </form>
      {message && <p className="message">{message}</p>}
      <div className="guess-container">
        {renderGuesses()}
      </div>
      {renderKeyboard()}
      <p>Points: {points}</p>
    </div>
  );
};

export default Wordle;
