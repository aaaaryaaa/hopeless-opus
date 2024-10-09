import React, { useState, useEffect } from 'react';
import './Wordle.css';

const WORD_LIST = [
    "APPLE", "BRAVE", "CHAIR", "DANCE", "EARTH", "FLUTE", "GRASS", "HOUSE", "IVORY", "JOKER",
    "KNIFE", "LEMON", "MOUSE", "NIGHT", "OCEAN", "PARTY", "QUEEN", "RIVER", "STONE", "TIGER",
    "UMBRA", "VIVID", "WATER", "XENON", "YACHT", "ZEBRA", "ANGEL", "BLAZE", "CRANE", "DOUBT",
    "EAGLE", "FLAME", "GIANT", "HEART", "IDEAL", "JOLLY", "KINGS", "LUNAR", "MAGIC", "NORTH",
    "OLIVE", "PEACE", "QUICK", "RAVEN", "SHARP", "TALON", "URBAN", "VALVE", "WIDEN", "XYLEM",
    "YOUTH", "ZONES", "AMBER", "BOOST", "CHARM", "DREAM", "ENTRY", "FLOCK", "GLOOM", "HARSH",
    "IMAGE", "JOKES", "KNOCK", "LEAPS", "MARCH", "NEONS", "ORBIT", "PEARL", "QUIET", "ROAST",
    "SHIFT", "TABLE", "ULTRA", "VIPER", "WHALE", "XEROX", "YELLS", "ZINGS", "ANVIL", "BLISS",
    "CREEK", "DELTA", "FROST", "GLOBE", "HONEY", "IVIES", "JUMPS", "KITES", "LINKS", "MIRTH",
    "NODES", "OPENS", "PLUSH", "QUIRK", "ROOTS", "STARS", "TWICE", "UNSET", "VIBES", "WAVES"
]

const MAX_GUESSES = 6; // Maximum number of guesses allowed

const Wordle = () => {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [targetWord, setTargetWord] = useState('');
  const [message, setMessage] = useState('');
  const [absentLetters, setAbsentLetters] = useState(new Set());

  useEffect(() => {
    // Select a random target word when the component mounts
    setTargetWord(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
  }, []);

  
  const handleChange = (letter) => {
    if (guess.length < 5) {
      setGuess((prev) => prev + letter);
    }
  };

  const handleDelete = () => {
    setGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (guess.length !== 5) {
      setMessage('Guess must be 5 letters long.');
      return;
    }

    setGuesses([...guesses, guess]);
    setMessage('');

    // Update absent letters based on the current guess
    const newAbsentLetters = new Set(absentLetters);
    guess.split('').forEach((letter) => {
      if (!targetWord.includes(letter)) {
        newAbsentLetters.add(letter);
      }
    });
    setAbsentLetters(newAbsentLetters);

    if (guess === targetWord) {
      setMessage('Congratulations! You guessed the word!');
    } else if (guesses.length === MAX_GUESSES - 1) {
      setMessage(`Game over! The word was ${targetWord}.`);
    }
    setGuess('');
  };

  const renderGuesses = () => {
    return Array.from({ length: MAX_GUESSES }, (_, index) => {
      const currentGuess = guesses[index] || '';
      const targetLetterCount = {}; // Count occurrences of each letter in the target word

      // Initialize the count of each letter in the target word
      targetWord.split('').forEach(letter => {
        targetLetterCount[letter] = (targetLetterCount[letter] || 0) + 1;
      });

      // First pass: Mark correct (green) letters and decrease the target letter count
      const result = Array.from({ length: 5 }, (_, i) => {
        const letter = currentGuess[i] || ''; 
        let className = 'letter';

        if (letter && targetWord[i] === letter) {
          className += ' correct'; // Correct letter and position
          targetLetterCount[letter]--; // Decrease count of this letter
        }

        return { letter, className };
      });

      // Second pass: Mark present (yellow) letters if the count allows it
      result.forEach((entry, i) => {
        if (!entry.className.includes('correct') && targetWord.includes(entry.letter)) {
          if (targetLetterCount[entry.letter] > 0) {
            entry.className += ' present'; // Correct letter but wrong position
            targetLetterCount[entry.letter]--; // Decrease count of this letter
          } else {
            entry.className += ' absent'; // No more occurrences of this letter in the target word
          }
        } else if (!entry.className.includes('correct')) {
          entry.className += ' absent'; // Letter not in word
        }
      });

      // Render the guess row
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
      'QWERTYUIOP',
      'ASDFGHJKL',
      'ZXCVBNM',
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
    </div>
  );
};

export default Wordle;
