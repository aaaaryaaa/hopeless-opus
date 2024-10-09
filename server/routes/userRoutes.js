const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import your User model
const router = express.Router();

// Middleware to authenticate JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.id; // Save user ID from the token
    next(); // Continue to the next middleware or route handler
  });
};

// Route to get user details
router.get("/getuser", authMiddleware, (req, res) => {
  User.findById(req.userId)
    .select("-password") // Exclude password from the response
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user); // Return user details
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// PUT Route to update currentStoryId and points
router.put("/updatestory", authMiddleware, (req, res) => {
  const { currentStoryId, points, health, money, rf, inventory } = req.body;

  if (!currentStoryId) {
    return res.status(400).json({ message: "currentStoryId is required" });
  }

  if (points === undefined) {
    return res.status(400).json({ message: "points are required" });
  }

  if (health === undefined) {
    return res.status(400).json({ message: "health is required" });
  }

  if (money === undefined) {
    return res.status(400).json({ message: "money is required" });
  }

  if (rf === undefined) {
    return res.status(400).json({ message: "rf is required" });
  }

  if (inventory === undefined) {
    return res.status(400).json({ message: "inventory is required" });
  }

  // Find the user by req.userId and update currentStoryId and points
  User.findByIdAndUpdate(
    req.userId,
    { currentStoryId, points, health, money, rf, inventory }, // Update both currentStoryId and points
    { new: true, useFindAndModify: false } // Return the updated user and avoid deprecation warning
  )
    .select("-password") // Exclude password from the response
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Story and points updated successfully", user });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
