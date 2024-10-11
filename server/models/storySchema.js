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
  },
  options: [
    {
      optionText: String,
      nextStoryId: String,
      points: {
        type: Number,
        default: 0,
      },
      money: {
        type: Number,
        default: 0,
      },
      rf: {
        type: Number,
        default: 0,
      },
      health: {
        type: Number,
        default: 0,
      },
      inventory: {
        key: {
          type: Boolean
        },
        umbrella: {
          type: Boolean
        },
        journal: {
          type: Boolean
        }
      }
    },
  ],
  minigame: {
    type: Number,
    required: true,
  }
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
