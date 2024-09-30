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
  options: [
    {
      optionText: String,
      nextStoryId: String,
    },
  ],
  previousStoryId: {
    type: String,
    default: null, // For the first story snippet
  },
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
