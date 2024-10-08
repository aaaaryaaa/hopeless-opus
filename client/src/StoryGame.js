import React, { useState, useEffect } from "react";
import BaseUrl from "./BaseUrl";
import { useNavigate } from "react-router-dom";

const StoryGame = () => {
  const nav = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storyId, setStoryId] = useState("0000");
  const [points, setPoints] = useState(0); // Initialize points to 0
  const [money, setMoney] = useState(0);
  const [health, setHealth] = useState(0);
  const [rf, setRF] = useState(0);
  const [snippetIndex, setSnippetIndex] = useState(0); // State for snippet index
  const [inventory, setInventory] = useState(null);

  // Fetch user details only when the component mounts
  async function fetchUserDetails() {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      const response = await fetch(`${BaseUrl}/api/user/getuser`, {
        method: "GET",
        headers: {
          Authorization: `${token}`, // Include the token in the Authorization header
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
      setMoney(userDetails.money);
      setHealth(userDetails.health);
      setRF(userDetails.rf);
      setInventory(userDetails.inventory);
      console.log(userDetails.points);
      fetchStory(userDetails.currentStoryId);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      nav("/storyerror");
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
      setSnippetIndex(0); // Reset the snippet index to 0 when a new story is fetched
    } catch (error) {
      console.error("Error fetching story:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentStoryIdAndPoints = async (newStoryId, newPoints, newHealth, newMoney, newRF, inv) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const userId = localStorage.getItem("userId"); // Store user ID in localStorage when user logs in

    try {
      const response = await fetch(`${BaseUrl}/api/user/updatestory`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          currentStoryId: newStoryId,
          points: newPoints, // Send updated points to the backend
          health: newHealth,
          money: newMoney,
          rf: newRF,
          inventory: inv
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

  const handleOptionClick = async (nextStoryId, optionPoints, optionHealth, optionMoney, optionRF, optionInventory) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    try {
      const response = await fetch(`${BaseUrl}/api/user/getuser`, {
        method: "GET",
        headers: {
          Authorization: `${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userDetails = await response.json();
      console.log(userDetails); // Use user details as needed
      setStoryId(userDetails.currentStoryId);

      const firstTwoDigits1 = userDetails.currentStoryId.slice(0, 2);
      const firstTwoDigits2 = nextStoryId.slice(0, 2);

      // Check if moving to the next story is allowed
      if (firstTwoDigits1 < firstTwoDigits2) {
        if (points === null) setPoints(0);
        const updatedPoints = points + optionPoints; // Add option points to current points
        const updatedHealth = health + optionHealth;
        const updatedMoney = money + optionMoney;
        const updatedRF = rf + optionRF;
        console.log(updatedPoints, points, optionPoints);
        console.log(updatedHealth, health, optionHealth);
        console.log(updatedMoney, money, optionMoney);
        console.log(updatedRF, rf, optionRF);
        setPoints(updatedPoints); // Update the UI with new points
        setHealth(updatedHealth);
        setMoney(updatedMoney);
        setRF(updatedRF);
        const inv = inventory;
        inv.key.value = optionInventory.key;
        inv.umbrella.value = optionInventory.umbrella;
        inv.journal.value = optionInventory.journal;
        console.log(inv, optionInventory);
        setInventory(inv);
        fetchStory(nextStoryId); // Fetch the new story
        updateCurrentStoryIdAndPoints(nextStoryId, updatedPoints, updatedHealth, updatedMoney, updatedRF, inv); // Update the story ID and points in the backend
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const handleNextSnippet = () => {
    if (snippetIndex < story.snippet.length - 1) {
      setSnippetIndex(snippetIndex + 1); // Move to the next snippet
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${story?.bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%', // Cover the full width of the viewport
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // Align content to the bottom
        padding: '20px',
        color: 'white', // Text color for better readability
      }}
      onClick={handleNextSnippet}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        story && (<>
          <div 
            className="text-end">
              <div 
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for the text box
                padding: '20px',
                maxWidth: '90%',
                margin: '0 auto',
              }}
              className="absolute top-24 right-0"
              >
              <p>Points: {points}</p>
              <p>Health: {health}</p>
              <p>Money: {money}</p>
              <p>Risk Factor: {rf}</p>
              <p>Key: {inventory?.key?.value ? 'Yes' : 'No'}</p>
              <p>Umbrella: {inventory?.umbrella?.value ? 'Yes' : 'No'}</p>
              <p>Journal: {inventory?.journal?.value ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <div className="mb-5">
            {snippetIndex === story.snippet.length - 1 && (
              <div className="flex ">
                {story.options.map((option, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for the text box
                      padding: '20px',
                      borderRadius: '10px',
                      width: '100%',
                      margin: '1rem 0.5rem',
                    }}
                    onClick={() =>
                      handleOptionClick(
                        option.nextStoryId,
                        option.points,
                        option.health,
                        option.money,
                        option.rf,
                        option.inventory
                      )
                    }
                  >
                    {option.optionText}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for the text box
              padding: '20px',
              width: '100%',
              margin: '0 auto',
            }}
          >
            <p>{story.snippet[snippetIndex].text}</p>
            

            {/* {snippetIndex < story.snippet.length - 1 && (
              <button
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={handleNextSnippet}
              >
                Next
              </button>
            )} */}

          </div>
        </>
        )
      )}
    </div>
  );
};

export default StoryGame;
