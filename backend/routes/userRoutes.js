const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const accessControlMiddleware = require('../middleware/accessControlMiddleware');

// Register a new user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Delete user
router.delete('/:userId', [authMiddleware, accessControlMiddleware], userController.deleteUser);

// Get all users (Admin only)
router.get('/', [authMiddleware, accessControlMiddleware], userController.getAllUsers);

module.exports = router;