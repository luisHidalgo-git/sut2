const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/auth');

/**
 * Middleware to verify JWT token
 */
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'No se proporcionó token de autenticación'
    });
  }

  try {
    // Remove Bearer prefix if present
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    const decoded = jwt.verify(tokenValue, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
      error: error.message
    });
  }
};

/**
 * Middleware to verify if user is an estudiante
 */
const isEstudiante = (req, res, next) => {
  if (req.user && req.user.tipo === 'estudiante') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'No autorizado - Requiere rol de estudiante'
    });
  }
};

/**
 * Middleware to verify if user is an empresa
 */
const isEmpresa = (req, res, next) => {
  if (req.user && req.user.tipo === 'empresa') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'No autorizado - Requiere rol de empresa'
    });
  }
};

module.exports = {
  verifyToken,
  isEstudiante,
  isEmpresa
};