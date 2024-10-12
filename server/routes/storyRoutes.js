const express = require("express");
const Story = require("../models/storySchema"); // Path to your model
const router = express.Router();

// Get the first story snippet (ID: 0001)
router.get("/story/start", async (req, res) => {
  try {
    const story = await Story.findOne({ storyId: "0001" });
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: "Error fetching the first story" });
  }
});

// Get story snippet by storyId
router.get("/story/:storyId", async (req, res) => {
  const { storyId } = req.params;
  try {
    const story = await Story.findOne({ storyId });
    if (story) {
      res.json(story);
    } else {
      res.status(404).json({ message: "Story not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error fetching the story" });
  }
});

// Add a new story snippet
// router.post("/story", async (req, res) => {
//   const { storyId, snippet, options, previousStoryId } = req.body;
//   try {
//     const newStory = new Story({ storyId, snippet, options, previousStoryId });
//     await newStory.save();
//     res.status(201).json(newStory);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: "Error adding new story", details: err.message });
//   }
// });
router.post("/story", async (req, res) => {
  const { storyId, snippet, options, minigame } = req.body; // Include bgimg and minigame

  // Check if all required fields are present
  if (!storyId || !snippet || minigame === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newStory = new Story({
      storyId,
      snippet,
      options,
      minigame,  // Add minigame here
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error adding new story", details: err.message });
  }
});


module.exports = router;
