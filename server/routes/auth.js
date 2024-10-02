require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); // Import the auth middleware

const router = express.Router();

// Register new user
router.post("/register", authMiddleware, (req, res) => {
  if (req.user) {
    return res.status(403).json({ message: "User already authenticated" });
  }

  const { name, phone, email, password, confirmPassword } = req.body; // Add fields here

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if the user already exists
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user object
    const newUser = new User({ name, phone, email, password });

    // Hash the password before saving the user
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash; // Set hashed password

        // Save the new user
        newUser
          .save()
          .then((user) => res.json({ message: "User registered successfully" }))
          .catch((err) => res.status(500).json({ error: err.message }));
      });
    });
  });
});

// Login user and return JWT token
router.post("/login", authMiddleware, (req, res) => {
  if (req.user) {
    return res.status(403).json({ message: "User already authenticated" });
  }

  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const payload = { id: user.id, name: user.name }; // Include user details in the payload
        jwt.sign(
          payload,
          process.env.SECRET, // Use the secret from your .env file
          { expiresIn: "1h" }, // Token expires in 1 hour
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: "Bearer " + token, // Send the token back to the client
            });
          }
        );
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Protected route
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
