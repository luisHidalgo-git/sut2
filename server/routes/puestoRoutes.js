const express = require('express');
const router = express.Router();
const { 
  createPuesto, 
  getAllPuestos, 
  getPuestoById, 
  updatePuesto, 
  deletePuesto, 
  getEmpresaPuestos 
} = require('../controllers/puestoController');
const { verifyToken, isEmpresa } = require('../middleware/auth');

// Create job position
router.post('/', verifyToken, isEmpresa, createPuesto);

// Get all job positions (public)
router.get('/', getAllPuestos);

// Get job position by ID (public)
router.get('/:id', getPuestoById);

// Update job position
router.put('/:id', verifyToken, isEmpresa, updatePuesto);

// Delete job position
router.delete('/:id', verifyToken, isEmpresa, deletePuesto);

// Get company job positions
router.get('/empresa/mis-puestos', verifyToken, isEmpresa, getEmpresaPuestos);

module.exports = router;