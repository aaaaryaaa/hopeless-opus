const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path based on your project structure
const authMiddleware = require("../middleware/authMiddleware"); // Adjust the path based on your project structure

const router = express.Router();

// Registration Route
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

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      "teamLeader.email": teamLeader_email,
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

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
      password: await bcrypt.hash(password, 10), // Hash the password
    });

    // Save the new user
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: teamLeader_email }, // Payload
      process.env.SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

    res.json({ message: "User registered successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { teamId, password } = req.body; // Changed to teamId

  try {
    // Find user by teamId
    const user = await User.findOne({ teamId: teamId }); // Updated to use teamId
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Changed to 404
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, teamId }, // Payload updated to include teamId
      process.env.SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

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
