const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const fs = require("fs").promises; // Use promises API
const path = require("path");
const router = express.Router();

let enrollmentData;

// Load enrollment data asynchronously
(async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../enrollmentValidation", "enrollmentData.json"),
      "utf-8"
    );
    enrollmentData = JSON.parse(data).teams; // Access the teams array directly
  } catch (err) {
    console.error("Error reading the JSON file:", err);
  }
})();

// Register Route
router.post("/register", async (req, res) => {
  const {
    teamId,
    teamLeader_name,
    teamLeader_phone,
    teamLeader_email,
    teamLeader_registrationNumber,
    teamLeader_institute,
    teamLeader_delegateId,
    player2_name,
    player2_email,
    player2_registrationNumber,
    player2_phone,
    player2_institute,
    player2_delegateId,
    password,
    confirmPassword,
  } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Validate against enrollment data
  // const team = enrollmentData.find((team) => team.team_id === teamId);

  // Log only the specific team and its delegate IDs
  // if (team) {
  //   console.log(`Checking Team ID: ${teamId}`);
  //   console.log(`Delegate IDs: ${team.delegate_ids}`);
  // } else {
  //   console.log(`No team found with ID: ${teamId}`);
  // }

  // const isValidDelegateId =
  //   team && team.delegate_ids.includes(teamLeader_delegateId);

  // if (!isValidDelegateId) {
  //   return res.status(400).json({ message: "Invalid delegate ID or team ID." });
  // }

  try {
    // Check if the team leader or player 2 already exists
    // const existingUser = await User.findOne({
    //   $or: [
    //     { "teamLeader.delegateId": teamLeader_delegateId },
    //     { "player2.delegateId": player2_delegateId },
    //   ],
    // });

    // if (existingUser) {
    //   return res
    //     .status(400)
    //     .json({ message: "User with this delegate ID already exists" });
    // }

    // Create a new user object
    const newUser = new User({
      teamId,
      teamLeader: {
        name: teamLeader_name,
        phone: teamLeader_phone,
        email: teamLeader_email,
        registrationNumber: teamLeader_registrationNumber,
        institute: teamLeader_institute,
        delegateId: teamLeader_delegateId,
      },
      player2: {
        name: player2_name,
        phone: player2_phone,
        email: player2_email,
        registrationNumber: player2_registrationNumber,
        institute: player2_institute,
        delegateId: player2_delegateId,
      },
      password: await bcrypt.hash(password, 10),
    });

    // Save the new user
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: teamLeader_email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { teamId, password } = req.body;

  try {
    const user = await User.findOne({ teamId: teamId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, teamId }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected Route Example
router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the protected route!" });
});

module.exports = router;