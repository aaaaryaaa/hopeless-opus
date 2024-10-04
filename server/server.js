require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const passport = require("passport");

// Import routes
const storyRoutes = require("./routes/storyRoutes"); // Your story routes
const authRoutes = require("./routes/auth"); // New authentication routes
const userRoutes = require("./routes/userRoutes"); //User with story ka routes
require("./config/passport")(passport); // Passport config

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use("/api/", storyRoutes); // Story routes
app.use("/api/auth/", authRoutes); // Authentication routes
app.use("/api/user/", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Protected test route (example)
app.get(
  "/api/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("This is a protected route");
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
