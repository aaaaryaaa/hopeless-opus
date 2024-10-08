import React, { useState, useEffect } from "react";

const HammerGame = () => {
    const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(null))); // 3x3 grid
    const [hammerPosition, setHammerPosition] = useState({ row: -1, col: -1 });
    const [guessesLeft, setGuessesLeft] = useState(5);
    const [message, setMessage] = useState("Guess where the hammer is!");
    const [gameOver, setGameOver] = useState(false);
    const [playerWon, setPlayerWon] = useState(false);

    // Function to randomly place the hammer at the start of the game
    useEffect(() => {
        const randomRow = Math.floor(Math.random() * 3);
        const randomCol = Math.floor(Math.random() * 3);
        setHammerPosition({ row: randomRow, col: randomCol });
    }, []);

    // Function to handle player's guess
    const handleGuess = (row, col) => {
        if (gameOver) return;

        if (guessesLeft > 0) {
            if (row === hammerPosition.row && col === hammerPosition.col) {
                setMessage("You found the hammer! You broke the door!");
                setGameOver(true);
                setPlayerWon(true);
            } else {
                setGuessesLeft(guessesLeft - 1);
                setMessage(`Incorrect! You have ${guessesLeft - 1} guesses left.`);
            }

            if (guessesLeft - 1 === 0 && !playerWon) {
                setMessage("You ran out of guesses. Someone else opened the door.");
                setGameOver(true);
            }
        }
    };

    // Render the 3x3 grid of boxes
    const renderGrid = () => {
        return grid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", justifyContent: "center" }}>
                {row.map((_, colIndex) => (
                    <button
                        key={colIndex}
                        onClick={() => handleGuess(rowIndex, colIndex)}
                        style={{
                            width: "100px", // Bigger width
                            height: "100px", // Bigger height
                            margin: "10px",  // More space between buttons
                            backgroundColor: gameOver
                                ? rowIndex === hammerPosition.row && colIndex === hammerPosition.col
                                    ? "green"
                                    : "red"
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
                ))}
            </div>
        ));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Hammer Guessing Game</h1>
            <p>{message}</p>
            <div>{renderGrid()}</div>
            {gameOver && (
                <div>
                    <h2>{playerWon ? "You Win!" : "Game Over"}</h2>
                    <button onClick={() => window.location.reload()}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default HammerGame;
