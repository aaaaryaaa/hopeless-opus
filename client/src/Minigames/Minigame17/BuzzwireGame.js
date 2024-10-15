import React, { useRef, useEffect, useState } from "react";
import pipeImage from "./image.png"; // Import the image from the src folder

const BuzzwireGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [promptVisible, setPromptVisible] = useState(true);
  const [winMessage, setWinMessage] = useState("");
  const [mouseFlag, setMouseFlag] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = pipeImage;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw image on canvas
    };

    const checkMousePosition = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Log coordinates for debugging
      console.log(`x=${x}, y=${y}`);

      if (x > 10) {
        if (mouseFlag === 0) {
          alert(
            "Place mouse at beginning of pipe and hit Enter!! Don't click OK!"
          );
        }
      } else if (x <= 10) {
        setMouseFlag(1);
        startGame();
      }
    };

    const startGame = () => {
      if (gameStarted) return;

      setGameStarted(true);
      setPromptVisible(false); // Hide prompt when starting the game
      alert("Game Started! Guide the mouse through the pipe.");

      const mouseMoveHandler = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const pixelData = ctx.getImageData(x, y, 1, 1).data;

        console.log(`x=${x}, y=${y}, alpha=${pixelData[3]}`); // Log alpha value

        // Check if the mouse touches the boundary
        if (pixelData[3] === 255) {
          setGameOver(true);
          alert(
            "Game Over! You touched the boundary. Please restart the game."
          );
          resetGame(); // Automatically reset the game on game over
        }

        // Check for cheating (trying to escape the pipe)
        if (y <= 26 || y >= 670) {
          alert("No Cheating!!");
          resetGame(); // Automatically reset the game
        }

        // Check if the user wins (reaches the end of the pipe)
        if (x >= 1340) {
          setWinMessage(
            "You Win! Congratulations on successfully traversing the pipe!"
          );
          setGameStarted(false); // Reset game state
        }
      };

      canvas.addEventListener("mousemove", mouseMoveHandler);

      return () => {
        canvas.removeEventListener("mousemove", mouseMoveHandler);
      };
    };

    canvas.addEventListener("mousemove", checkMousePosition);

    return () => {
      canvas.removeEventListener("mousemove", checkMousePosition);
    };
  }, [gameStarted, mouseFlag]);

  const resetGame = () => {
    setGameOver(false);
    setGameStarted(false);
    setMouseFlag(0);
    setPromptVisible(true);
    setWinMessage(""); // Reset win message
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-6">Buzzwire Game</h1>
      {promptVisible && (
        <p className="mb-4 text-lg text-red-600">
          Place your mouse at the start of the pipe and press Enter.
        </p>
      )}
      <canvas
        ref={canvasRef}
        width={1400}
        height={700}
        className="border-4 border-gray-700 bg-white relative"
      ></canvas>

      {winMessage && (
        <p className="mt-4 text-2xl text-green-600">{winMessage}</p>
      )}
    </div>
  );
};

export default BuzzwireGame;
