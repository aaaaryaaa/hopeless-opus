import React from "react";
import BuzzwireGame from "./BuzzwireGame"; // Adjust path if necessary

function Minigame17({gameResult}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <BuzzwireGame  gameResult={gameResult}/>
    </div>
  );
}

export default Minigame17;
