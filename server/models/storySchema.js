const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  storyId: {
    type: String,
    required: true,
    unique: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  bgimg: {
    type: String, // Cloudinary link
    required: false, 
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
    default: null, // For the first story snippet
  },
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
