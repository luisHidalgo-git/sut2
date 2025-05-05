const express = require('express');
const router = express.Router();
const { 
  registerEstudiante, 
  registerEmpresa, 
  login, 
  refreshToken 
} = require('../controllers/authController');
const { validarCamposEstudiante, validarCamposEmpresa } = require('../utils/validators');

// Register student
router.post('/estudiantes/register', validarCamposEstudiante, registerEstudiante);

// Register company
router.post('/empresas/register', validarCamposEmpresa, registerEmpresa);

// Unified login
router.post('/login', login);

// Refresh token
router.post('/refresh-token', refreshToken);

module.exports = router;