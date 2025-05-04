const express = require('express');
const router = express.Router();
const { 
  updatePerfilEmpresa, 
  getPerfilEmpresa 
} = require('../controllers/perfilEmpresaController');
const { verifyToken, isEmpresa } = require('../middleware/auth');
const upload = require('../utils/upload');

// Update company profile
router.put('/', verifyToken, isEmpresa, upload.single('foto_perfil'), updatePerfilEmpresa);

// Get company profile (public)
router.get('/:id', getPerfilEmpresa);

module.exports = router;