const mongoose = require("mongoose");
const enrollmentData = require("./enrollmentValidation/enrollmentData.json");
const Enrollment = require("./models/Enrollment");
require("dotenv").config();

console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Enrollment schema
const enrollmentSchema = new mongoose.Schema({
  teamId: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{5}$/.test(String(v)); // Convert to string for regex validation
      },
      message: (props) =>
        `${props.value} is not a valid teamId! It should be a 5-digit number.`,
    },
  },
  delegateId: {
    type: Number,
    required: true,
  },
});

// Update the loadData function
async function loadData() {
  try {
    // Check if enrollmentData.teams exists and is an array
    if (!Array.isArray(enrollmentData.teams)) {
      throw new TypeError("enrollmentData.teams is not an array");
    }

    // Iterate through the teams and upload to the database
    for (const team of enrollmentData.teams) {
      if (team.delegate_ids && Array.isArray(team.delegate_ids)) {
        // Ensure delegate_ids is an array
        for (const delegateId of team.delegate_ids) {
          const enrollment = new Enrollment({
            teamId: team.team_id,
            delegateId: delegateId,
          });

          // Save each enrollment and handle potential duplicate errors
          await enrollment.save();
        }
      } else {
        console.warn(
          `Team ${team.team_id} does not have a valid delegate_ids array`.
        );
      }
    }
    console.log("Data successfully loaded into the database.");
  } catch (err) {
    console.error("Error processing the data:", err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

loadData();