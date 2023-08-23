const jwt = require('jsonwebtoken');
const { getIo } = require('../sockets/socketHandler');
const config = require('../config/config');
const User = require('../models/User');

function authMiddleware(req, res, next) {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing.' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    // Find the user in the database based on the user ID
    User.findById(userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'User not authenticated.' });
      }

      // Attach the user object to the request for later use
      req.user = user;

      // Move to the next middleware or route handler
      next();
    });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = authMiddleware;
