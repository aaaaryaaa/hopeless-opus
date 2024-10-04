import React, { useState, useEffect } from "react";
import BaseUrl from "./BaseUrl";

const StoryGame = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storyId, setStoryId] = useState('0000');

  // Fetch user details only when the component mounts
  useEffect(() => {
    async function fetchUserDetails() {
      const token = localStorage.getItem("token"); // Get the token from localStorage
    
      try {
        const response = await fetch(`${BaseUrl}/api/user/getuser`, {
          method: "GET",
          headers: {
            "Authorization": `${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
    
        const userDetails = await response.json();
        console.log(userDetails); // Use user details as needed
        setStoryId(userDetails.currentStoryId);
        fetchStory(userDetails.currentStoryId);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    }

    // Call the function to fetch user details
    fetchUserDetails();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const fetchStory = async (storyId) => {
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/api/story/${storyId}`);
      const data = await response.json();
      setStory(data);
    } catch (error) {
      console.error("Error fetching story:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentStoryId = async (newStoryId) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const userId = localStorage.getItem("userId"); // Store user ID in localStorage when user logs in

    try {
      const response = await fetch(`${BaseUrl}/api/user/updatestory`, {
        method: "PUT",
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          currentStoryId: newStoryId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update current story ID");
      }

      const data = await response.json();
      console.log("Story updated successfully:", data);
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

  const handleOptionClick = (nextStoryId) => {
    fetchStory(nextStoryId);
    updateCurrentStoryId(nextStoryId); // Update the user's current story ID in the backend
  };

  return (
    <div>
      {storyId === '0000' ? (
        <p>Loading....</p>
      ) : (
        <>
          {story && (
            <div>
              <p>{story.snippet}</p>
              {story.options.map((option, index) => (
                <button key={index} onClick={() => handleOptionClick(option.nextStoryId)}>
                  {option.optionText}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StoryGame;
