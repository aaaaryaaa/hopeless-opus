const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  teamLeader_name: {
    type: String,
    required: true,
  },
  player2_name: {
    type: String,
    required: false,
  },
  teamLeader_phone: {
    type: String,
    required: true,
  },
  teamLeader_email: {
    type: String,
    required: true,
    unique: true,
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
  sessionId: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", UserSchema);
