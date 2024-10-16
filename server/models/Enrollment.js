const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  teamId: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{5}$/.test(String(v)); // Ensure it's a 5-digit number
      },
      message: (props) =>
       `${props.value} is not a valid teamId! It should be a 5-digit number.`,
    },
  },
  delegateIds: {
    type: [Number], // Change to an array to hold multiple delegate IDs
    required: true,
    validate: {
      validator: function (v) {
        return v.every((delegateId) => /^\d{5}$/.test(String(delegateId))); // Ensure all delegate IDs are 5-digit numbers
      },
      message: (props) => `All delegate IDs must be 5-digit numbers!`,
    },
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;