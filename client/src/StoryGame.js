import React, { useState, useEffect } from "react";
import BaseUrl from "./BaseUrl";


const StoryGame = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStory = async (storyId) => {
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/api/story/0001`);
      console.log(`${BaseUrl}`);
      const data = await response.json();
      setStory(data);
    } catch (error) {
      console.error("Error fetching story:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the initial story when the game starts
  const startGame = () => {
    fetchStory("0001");
  };

  const handleOptionClick = (nextStoryId) => {
    fetchStory(nextStoryId);
  };

  return (
    <div>
      
      {!story && (
        <div>
          <h1>Welcome to the Story Game</h1>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {story && !loading && (
        <div>
          <p>{story.snippet}</p>
          {story.options.map((option, index) => (
            <button key={index} onClick={() => handleOptionClick(option.nextStoryId)}>
              {option.optionText}
            </button>
          ))}
        </div>
      )} 
  
    
    </div>

  );
};

export default StoryGame;
