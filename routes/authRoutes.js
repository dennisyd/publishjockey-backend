const express = require('express');
const router = express.Router();
const { 
  register, 
  verifyEmail, 
  login, 
  forgotPassword, 
  resetPassword,
  getCurrentUser,
  updateProfile
} = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', verifyToken, getCurrentUser);
router.put('/update-profile', verifyToken, updateProfile);

module.exports = router; 