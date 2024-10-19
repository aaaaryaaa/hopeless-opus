import React, { useState, useEffect } from "react";

const HammerGame = ({ gameResult }) => {
    const initialGrid = Array(3).fill(Array(3).fill(null));

    // Initial states
    const initialGuesses = 5;
    const initialMessage = "Guess where the hammer is!";

    const [grid, setGrid] = useState(initialGrid); // 3x3 grid
    const [hammerPosition, setHammerPosition] = useState({ row: -1, col: -1 });
    const [guessesLeft, setGuessesLeft] = useState(initialGuesses);
    const [message, setMessage] = useState(initialMessage);
    const [gameOver, setGameOver] = useState(false);
    const [playerWon, setPlayerWon] = useState(false);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]); // Track incorrect guesses

    // Function to randomly place the hammer at the start of the game
    const placeHammerRandomly = () => {
        const randomRow = Math.floor(Math.random() * 3);
        const randomCol = Math.floor(Math.random() * 3);
        setHammerPosition({ row: randomRow, col: randomCol });
    };

    useEffect(() => {
        placeHammerRandomly();
    }, []);

    // Function to reset the game
    const resetGame = () => {
        setGrid(initialGrid);
        setGuessesLeft(initialGuesses);
        setMessage(initialMessage);
        setGameOver(false);
        setPlayerWon(false);
        setIncorrectGuesses([]); // Reset incorrect guesses
        placeHammerRandomly();
    };

    // Function to handle player's guess
    const handleGuess = (row, col) => {
        if (gameOver) return;

        if (guessesLeft > 0) {
            if (row === hammerPosition.row && col === hammerPosition.col) {
                setMessage("You found the hammer! You broke the door!");
                setGameOver(true);
                setPlayerWon(true);
                gameResult(100 * guessesLeft, true);
            } else {
                setGuessesLeft(guessesLeft - 1);
                setMessage(`Incorrect! You have ${guessesLeft - 1} guesses left.`);
                setIncorrectGuesses([...incorrectGuesses, { row, col }]); // Add incorrect guess
            }

            if (guessesLeft - 1 === 0 && !playerWon) {
                setGameOver(true);
            }
        }
    };

    // Render the 3x3 grid of boxes
    const renderGrid = () => {
        return grid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", justifyContent: "center" }}>
                {row.map((_, colIndex) => {
                    const isIncorrectGuess = incorrectGuesses.some(
                        (guess) => guess.row === rowIndex && guess.col === colIndex
                    );

                    return (
                        <button
                            key={colIndex}
                            onClick={() => handleGuess(rowIndex, colIndex)}
                            style={{
                                width: "100px", // Bigger width
                                height: "100px", // Bigger height
                                margin: "10px", // More space between buttons
                                backgroundColor: gameOver
                                    ? rowIndex === hammerPosition.row && colIndex === hammerPosition.col
                                        ? "black"
                                        : "white"
                                    : isIncorrectGuess
                                    ? "red" // Tile turns red if guessed incorrectly
                                    : "lightgrey",
                                fontSize: "24px", // Bigger font for the hammer emoji
                                cursor: "pointer",
                            }}
                            disabled={gameOver}
                        >
                            {gameOver && rowIndex === hammerPosition.row && colIndex === hammerPosition.col
                                ? "🔨"
                                : ""}
                        </button>
                    );
                })}
            </div>
        ));
    };

    return (
        <div>
            <div
                className="p-8 bg-gray-700/70 backdrop-blur-md shadow-lg rounded-lg max-w-md w-full mx-auto"
                style={{ background: 'rgba(75, 85, 99, 0.7)', backdropFilter: 'blur(10px)' }}
            >
                <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "30px" }}>
                    <h1 className="text-3xl font-bold text-white">Hammer Guessing Game</h1>
                    <p className="text-white mt-4">{message}</p>

                    {/* Fixed height container to prevent shifting */}
                    <div style={{ height: "350px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        {renderGrid()}
                    </div>

                    {gameOver && (
                        <div>
                            <h2 className="text-2xl font-bold text-white mt-4">
                                {playerWon ? "You Win!" : "Game Over"}
                            </h2>
                            <button
                                onClick={resetGame}
                                className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600"
                            >
                                Play Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HammerGame;