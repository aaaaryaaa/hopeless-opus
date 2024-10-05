import React, { useState, useEffect } from "react";
import BaseUrl from "./BaseUrl";
import {useNavigate} from 'react-router-dom'

const StoryGame = () => {
  const nav = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storyId, setStoryId] = useState('0000');
  const [points, setPoints] = useState(0); // Initialize points to 0

  // Fetch user details only when the component mounts
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
      setPoints(userDetails.points); // Assume you store points in the backend
      console.log(userDetails.points);
      fetchStory(userDetails.currentStoryId);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      nav('/storyerror'); 
    }
  }
  useEffect(() => {
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

  const updateCurrentStoryIdAndPoints = async (newStoryId, newPoints) => {
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
          points: newPoints, // Send updated points to the backend
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update current story ID and points");
      }

      const data = await response.json();
      console.log("Story and points updated successfully:", data);
    } catch (error) {
      console.error("Error updating story and points:", error);
    }
  };

  const handleOptionClick = async (nextStoryId, optionPoints) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    console.log(optionPoints);
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
      // console.log(userDetails.currentStoryId);
      const firstTwoDigits1 = userDetails.currentStoryId.slice(0, 2);
      const firstTwoDigits2 = nextStoryId.slice(0, 2);
      // console.log(firstTwoDigits1 + " - " + firstTwoDigits2);
      
      // Check if moving to the next story is allowed
      if (firstTwoDigits1 < firstTwoDigits2) {
        if(points===null) setPoints(0);
        const updatedPoints = points + optionPoints; // Add option points to current points
        console.log(updatedPoints, points, optionPoints);
        setPoints(updatedPoints); // Update the UI with new points
        fetchStory(nextStoryId); // Fetch the new story
        updateCurrentStoryIdAndPoints(nextStoryId, updatedPoints); // Update the story ID and points in the backend
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
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
              <p>Points: {points}</p> {/* Display current points */}
              {story.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.nextStoryId, option.points)} // Pass the option's points
                >
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
