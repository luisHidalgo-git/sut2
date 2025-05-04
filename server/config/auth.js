require('dotenv').config();

module.exports = {
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'tu_secreto_jwt_seguro',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'tu_secreto_refresh_seguro',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },
  
  // Password hashing configuration
  bcrypt: {
    saltRounds: 10
  }
};