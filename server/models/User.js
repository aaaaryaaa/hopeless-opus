const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    // Added name field
    type: String,
    required: true,
  },
  phone: {
    // Added phone number field
    type: String,
    required: true,
  },
  email: {
    // Email field
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    // Password field
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
