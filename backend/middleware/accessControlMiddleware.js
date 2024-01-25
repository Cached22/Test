const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const accessControlMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, config.JWT_SECRET);
      const userId = decodedToken.id;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid request', error: error.message });
    }
  };
};

module.exports = accessControlMiddleware;