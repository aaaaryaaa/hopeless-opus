import React, { useState, useEffect } from 'react';
import Wolf from "./wolf.jpg";

const rows = 5;
const cols = 11;

function WhackaWolf({ gameResult }) {
    const [score, setScore] = useState(0);
    const [wolfPosition, setWolfPosition] = useState({ row: 0, col: 0 });
    const [gameStarted, setGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20); // 20 seconds for the game
    const [wolfInterval, setWolfInterval] = useState(1000); // Starting wolf appearance interval (1 second)
    const [triesLeft, setTriesLeft] = useState(3); // New state to track remaining tries

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
        if (triesLeft > 0) {
            setScore(0);
            setTimeLeft(20); // Reset time left to 20 seconds
            setWolfInterval(1000); // Reset wolf appearance interval to 1 second
            setGameStarted(true);
            setTriesLeft(prevTries => prevTries - 1); // Decrease tries left
        }
    };

    const handleEndGame = () => {
        gameResult(100 * score);
        setGameStarted(false);
    };

    return (
        <div
                className="p-8 bg-gray-700/70 backdrop-blur-md shadow-lg rounded-lg w-full mx-auto"
                style={{ background: 'rgba(75, 85, 99, 0.7)', backdropFilter: 'blur(10px)' }}
            >
        <div className="text-center m-5">
            <h1>Whack-a-Wolf</h1>
            <div className="mb-5">
                <p>Score: {score}</p>
                <p>Time Left: {timeLeft}s</p> {/* Displaying time left */}
            </div>
            <div className="flex flex-col justify-center items-center">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {Array.from({ length: cols }).map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className="w-16 h-16 m-1 border-2 border-white flex justify-center items-center bg-lightgreen hover:bg-green cursor-pointer"
                                onClick={() => {
                                    if (wolfPosition.row === rowIndex && wolfPosition.col === colIndex) {
                                        handleClickWolf();
                                    }
                                }}
                            >
                                {wolfPosition.row === rowIndex && wolfPosition.col === colIndex ? (
                                    <img
                                        src={Wolf}
                                        alt="Wolf"
                                        className="w-full h-full object-contain cursor-pointer"
                                    />
                                ) : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="mt-5">
                {triesLeft > 0 && !gameStarted ? (
                    <button
                        onClick={handleStartGame}
                        className="px-5 py-2 text-lg cursor-pointer hover:bg-blue bg-gray-200 text-black"
                    >
                        {gameStarted ? "Game Running" : `Start Game (${triesLeft} tries left)`}
                    </button>
                ) : (
                    <button
                        disabled
                        className="px-5 py-2 text-lg bg-gray-400 text-gray-800 cursor-not-allowed"
                    >
                        {triesLeft === 0 ? "No Tries Left" : "Game Running"}
                    </button>
                )}
            </div>
        </div>
        </div >
    );
}

export default WhackaWolf;
