const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  storyId: {
    type: String,
    required: true,
    unique: true,
  },
  snippet: [
    {
      text: String,
    }
  ],
  bgimg: {
    type: String, // Cloudinary link
    required: true, 
  },
  options: [
    {
      optionText: String,
      nextStoryId: String,
      points: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  previousStoryId: {
    type: String,
    required: false,
  },
  minigame: {
    type: Number,
    required: true,
  }
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
