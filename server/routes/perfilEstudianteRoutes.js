const express = require('express');
const router = express.Router();
const { 
  updatePerfilEstudiante, 
  uploadCV, 
  getPerfilEstudiante 
} = require('../controllers/perfilEstudianteController');
const { verifyToken, isEstudiante } = require('../middleware/auth');
const upload = require('../utils/upload');

// Update student profile
router.put('/', verifyToken, isEstudiante, upload.single('foto_perfil'), updatePerfilEstudiante);

// Upload CV
router.post('/cv', verifyToken, isEstudiante, upload.single('cv_document'), uploadCV);

// Get student profile (public)
router.get('/:id', getPerfilEstudiante);

module.exports = router;