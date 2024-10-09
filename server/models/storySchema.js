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
      money: {
        type: Number,
        required: true,
        default: 0,
      },
      rf: {
        type: Number,
        required: true,
        default: 0,
      },
      health: {
        type: Number,
        required: true,
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
