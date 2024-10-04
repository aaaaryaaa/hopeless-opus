require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); // Import the auth middleware
const uuid = require("uuid");
const router = express.Router();

// Register new user
router.post("/register", authMiddleware, async (req, res) => {
  if (req.user) {
    return res.status(403).json({ message: "User already authenticated" });
  }

  const {
    teamLeader_name,
    teamLeader_phone,
    teamLeader_email,
    player2_name,
    password,
    confirmPassword,
  } = req.body;
  console.log(req.body);
  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "check password dumass" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ teamLeader_email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user object
    const newUser = new User({
      teamLeader_name,
      teamLeader_phone,
      teamLeader_email,
      player2_name,
      password,
    
    });

    // Hash the password before saving the user
    newUser.password = await bcrypt.hash(password, 10);

    // Save the new user
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  console.log(req.body); // Log incoming request body
 
});

// Login user and return JWT token
router.post("/login", authMiddleware, async (req, res) => {
  if (req.user) {
    return res.status(403).json({ message: "User already authenticated" });
  }

  const { teamLeader_email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ teamLeader_email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const sessionId = uuid.v4();
    user.sessionId = sessionId; // Save sessionId to user in the database
    await user.save(); // Save user with updated sessionId

    // Generate token
    const payload = {
      id: user.id,
      name: user.teamLeader_name,
      sessionId: sessionId,
    };
    console.log(payload);
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "6h" });
    res.json({
      success: true,
      token: "Bearer " + token,
      storyId: user.currentStoryId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
