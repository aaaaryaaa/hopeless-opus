

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return next(); // Allow access to routes that don't require authentication
  }

  // Verify token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = decoded; // Save user ID to request for use in other routes
    next(); // Call the next middleware/route handler
  });
};

module.exports = authMiddleware;
