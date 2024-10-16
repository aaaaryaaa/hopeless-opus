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
      bgIndex: Number,
      charIndex1: Number,
      charIndex2: Number
    }
  ],
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
        script: {
          type: Boolean
        },
        journal: {
          type: Boolean
        },
        kumbh: {
          type: Boolean
        },
        sword: {
          type: Boolean
        },
        pickaxe: {
          type: Boolean
        },
        axe: {
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
