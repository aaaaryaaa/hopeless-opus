import React, { useState, useEffect } from 'react';
import './App.css';

const rows = 5;
const cols = 11;

function WhackaWolf() {
    const [score, setScore] = useState(0);
    const [wolfPosition, setWolfPosition] = useState({ row: 0, col: 0 });
    const [gameStarted, setGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20); // 20 seconds for the game
    const [wolfInterval, setWolfInterval] = useState(1000); // Starting wolf appearance interval (1 second)

    useEffect(() => {
        let timer;
        if (gameStarted) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        handleEndGame();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000); // Countdown every second

            // Random wolf position logic
            const wolfTimer = setInterval(() => {
                const randomRow = Math.floor(Math.random() * rows);
                const randomCol = Math.floor(Math.random() * cols);
                setWolfPosition({ row: randomRow, col: randomCol });
            }, wolfInterval); // Wolf appears at the specified interval

            return () => {
                clearInterval(timer);
                clearInterval(wolfTimer); // Cleanup the wolf timer
            };
        }
    }, [gameStarted, wolfInterval]);

    useEffect(() => {
        if (gameStarted) {
            if (score === 5) {
                // After 5 score, double the speed (change interval to 0.5 seconds)
                setWolfInterval(500);
            } else if (score === 10) {
                // After another 5 score, double the speed again (change interval to 0.25 seconds)
                setWolfInterval(250);
            }
        }
    }, [score, gameStarted]);

    const handleClickWolf = () => {
        if (timeLeft > 0) { // Only update score if game is running
            setScore(prevScore => prevScore + 1);
        }
    };

    const handleStartGame = () => {
        setScore(0);
        setTimeLeft(20); // Reset time left to 20 seconds
        setWolfInterval(1000); // Reset wolf appearance interval to 1 second
        setGameStarted(true);
    };

    const handleEndGame = () => {
        setGameStarted(false);
    };

    return (
        <div className="game-container">
            <h1>Whack-a-Wolf</h1>
            <div className="score-board">
                <p>Score: {score}</p>
                <p>Time Left: {timeLeft}s</p> {/* Displaying time left */}
            </div>
            <div className="grid">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {Array.from({ length: cols }).map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className="hole"
                                onClick={() => {
                                    if (wolfPosition.row === rowIndex && wolfPosition.col === colIndex) {
                                        handleClickWolf();
                                    }
                                }}
                            >
                                {wolfPosition.row === rowIndex && wolfPosition.col === colIndex ? (
                                    <img
                                        src="./wolf.png" // Update this to the path of your wolf image
                                        alt="Wolf"
                                        className="wolf"
                                    />
                                ) : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="controls">
                {!gameStarted ? (
                    <button onClick={handleStartGame}>Start Game</button>
                ) : (
                    <button disabled>Game Running</button> // Disabled button during the game
                )}
            </div>
        </div>
    );
}

export default WhackaWolf;
