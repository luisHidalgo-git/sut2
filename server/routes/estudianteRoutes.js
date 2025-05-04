const express = require('express');
const router = express.Router();
const { 
  getAllEstudiantes, 
  getEstudianteById, 
  updateEstudiante, 
  deleteEstudiante 
} = require('../controllers/estudianteController');
const { verifyToken, isEstudiante } = require('../middleware/auth');

// Get all students (public)
router.get('/', getAllEstudiantes);

// Get student by ID (public)
router.get('/:id', getEstudianteById);

// Update student
router.put('/:id', verifyToken, isEstudiante, updateEstudiante);

// Delete student
router.delete('/:id', verifyToken, isEstudiante, deleteEstudiante);

module.exports = router;