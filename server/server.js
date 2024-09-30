const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const storyRoutes = require('./routes/storyRoutes'); // Import story routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use story routes
app.use('/api', storyRoutes); // Use the story routes at the root level

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
