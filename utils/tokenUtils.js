const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config');

// Generate JWT token
const generateJWT = (user) => {
  try {
    // Log JWT token generation details
    console.log('JWT Payload:', {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    console.log('JWT Access Token Secret:', config.jwt.accessTokenSecret ? 'Exists' : 'Missing');
    console.log('JWT Expiry:', config.jwt.accessTokenExpiry);
    
    // Generate the token
    const token = jwt.sign(
      { 
        userId: user._id, 
        name: user.name,
        email: user.email,
        role: user.role 
      },
      config.jwt.accessTokenSecret,
      { 
        expiresIn: config.jwt.accessTokenExpiry
      }
    );
    
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error.message);
    throw error;
  }
};

// Generate random token for email verification or password reset
const generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  generateJWT,
  generateRandomToken
}; 