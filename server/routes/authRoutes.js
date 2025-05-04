const express = require('express');
const router = express.Router();
const { 
  registerEstudiante, 
  registerEmpresa, 
  loginEstudiante, 
  loginEmpresa, 
  refreshToken 
} = require('../controllers/authController');
const { validarCamposEstudiante, validarCamposEmpresa } = require('../utils/validators');

// Register student
router.post('/estudiantes/register', validarCamposEstudiante, registerEstudiante);

// Register company
router.post('/empresas/register', validarCamposEmpresa, registerEmpresa);

// Login student
router.post('/estudiantes/login', loginEstudiante);

// Login company
router.post('/empresas/login', loginEmpresa);

// Refresh token
router.post('/refresh-token', refreshToken);

module.exports = router;