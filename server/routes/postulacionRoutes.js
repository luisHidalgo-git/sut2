const express = require('express');
const router = express.Router();
const { 
  createPostulacion, 
  getEmpresaPostulaciones, 
  getEstudiantePostulaciones, 
  updatePostulacionStatus, 
  getPostulacionById, 
  deletePostulacion 
} = require('../controllers/postulacionController');
const { verifyToken, isEstudiante, isEmpresa } = require('../middleware/auth');

// Create application
router.post('/', verifyToken, isEstudiante, createPostulacion);

// Get all applications for a company
router.get('/empresa', verifyToken, isEmpresa, getEmpresaPostulaciones);

// Get all applications for a student
router.get('/estudiante', verifyToken, isEstudiante, getEstudiantePostulaciones);

// Update application status
router.put('/:id/status', verifyToken, isEmpresa, updatePostulacionStatus);

// Get application by ID
router.get('/:id', verifyToken, getPostulacionById);

// Delete application
router.delete('/:id', verifyToken, isEstudiante, deletePostulacion);

module.exports = router;