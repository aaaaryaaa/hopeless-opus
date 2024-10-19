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

// Route to get leaderboard
router.get('/leaderboard', (req, res) => {
  User.find({})
    // .select('-password -inventory') // Exclude password and inventory from the response
    .sort({ points: -1, choiceTime: 1 }) // Sort by points descending and time ascending
    .then((users) => {
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' })
      }

      // Prepare leaderboard with ranking

      res.json(users) // Return leaderboard
    })
    .catch((err) => res.status(500).json({ error: err.message }))
})

router.get('/leaderboardnew', (req, res) => {
  User.find({})
    .select('-password -inventory') // Exclude sensitive fields
    .then((users) => {
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      // Calculate score for each user as the sum of money and points
      const leaderboard = users.map(user => {
        const score = user.points + user.money; // Add money and points to get the score
        return { ...user.toObject(), score }; // Include score in the user object
      });

      // Sort the leaderboard by score in descending order
      leaderboard.sort((a, b) => b.score - a.score);

      res.json(leaderboard); // Return the sorted leaderboard
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});



// Route to get all users (No authentication required)
router.get("/allusers", (req, res) => {
  User.find({})
    .select("-password") // Exclude password from the response
    .then((users) => {
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      res.json(users); // Return all users
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// PUT Route to update currentStoryId and points
router.put("/updatestory", authMiddleware, (req, res) => {
  const { currentStoryId, points, health, money, rf, inventory, choiceTime } = req.body;

  // Validate the required fields
  if (
    !currentStoryId ||
    points === undefined ||
    health === undefined ||
    money === undefined ||
    rf === undefined ||
    inventory === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find the user by req.userId and update currentStoryId, points, and other attributes
  User.findByIdAndUpdate(
    req.userId,
    { currentStoryId, points, health, money, rf, inventory, choiceTime }, // Update the values
    { new: true, useFindAndModify: false } // Return the updated user and avoid deprecation warning
  )
    .select("-password") // Exclude password from the response
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Story and attributes updated successfully", user });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
