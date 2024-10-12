// src/Card.js
import React from "react";

const Card = ({ card, handleFlip }) => {
  return (
    <div
      className={`card w-14 h-20 m-2 bg-blue-500 text-white text-2xl flex justify-center items-center rounded-md cursor-pointer ${
        card.flipped || card.matched ? "flipped" : ""
      }`}
      onClick={() => handleFlip(card)}  
    >
      <div className="inner w-full h-full flex items-center justify-center">
        {card.flipped || card.matched ? (
          <span className="text-4xl">{card.image}</span>
        ) : (
          <span className="text-2xl">?</span>
        )}
      </div>
    </div>
  );
};

export default Card;
