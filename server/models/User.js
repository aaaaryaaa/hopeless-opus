const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  teamId: {
    type: String,
    required: true,
  },
  teamLeader: {
    delegateId: {
      type: String,
      required: true,
      unique: true, // Ensure this is unique if necessary
    },
    name: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure this is truly necessary
    },
  },
  player2: {
    delegateId: {
      type: String,
      required: false,
      unique: true, // If necessary, ensure this is unique across all users
    },
    name: {
      type: String,
      required: false,
    },
    registrationNumber: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    institute: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true, // Consider if necessary
    },
  },
  password: {
    type: String,
    required: true,
  },
  currentStoryId: {
    type: String,
    default: "0001",
  },
  points: {
    type: Number,
    default: 100,
  },
  money: {
    type: Number,
    default: 100,
  },
  health: {
    type: Number,
    default: 100,
  },
  rf: {
    type: Number,
    default: 100,
  },
  sessionId: {
    type: String,
    default: "",
  },
  inventory: {
    script: {
      value: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        default: "",
      },
    },
    journal: {
      value: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        default: "",
      },
    },
    kumbh: {
      value: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        default: "",
      },
    },
    sword: {
      value: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        default: "",
      },
    },
    pickaxe: {
      value: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        default: "",
      },
    },
    axe: {
      value: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        default: "",
      },
    },
  },
  minicounter: {
    type: [Number],
    default: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  },
  choiceTime: {
    type: Date,
    default: Date.now, // This sets the default to the current date and time
  }
});

// Export the model
const User = mongoose.model("User", UserSchema);
module.exports = User; // Ensure you are exporting the model correctly
