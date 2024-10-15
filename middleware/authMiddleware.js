const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure to adjust the path to your User model
require('dotenv').config(); // For environment variables

// Middleware to verify if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expected format: "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user information to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if the authenticated user is an admin
const isAdmin = async (req, res, next) => {
  try {
    // req.user is set in the isAuthenticated middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user's role is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin
};
