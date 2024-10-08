import React from "react";
import "./Play.css";
import Animate from "../Component/Animate";
import StoryGame from "../StoryGame";
import ImageHoverEffect from "../Component/ImageHoverEffect";

const Play = () => {
  return (
    <div className="h-screen">
      <ImageHoverEffect/>
        <StoryGame />
    </div>
  );
};

export default Play;
