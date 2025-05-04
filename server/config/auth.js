module.exports = {
  // JWT configuration
  jwt: {
    secret: 'tu_secreto_jwt_seguro',
    expiresIn: '24h',
    refreshSecret: 'tu_secreto_refresh_seguro',
    refreshExpiresIn: '7d'
  },
  
  // Password hashing configuration
  bcrypt: {
    saltRounds: 10
  }
};