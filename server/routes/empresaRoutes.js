const express = require('express');
const router = express.Router();
const { 
  getAllEmpresas, 
  getEmpresaById, 
  updateEmpresa, 
  deleteEmpresa 
} = require('../controllers/empresaController');
const { verifyToken, isEmpresa } = require('../middleware/auth');

// Get all companies (public)
router.get('/', getAllEmpresas);

// Get company by ID (public)
router.get('/:id', getEmpresaById);

// Update company
router.put('/:id', verifyToken, isEmpresa, updateEmpresa);

// Delete company
router.delete('/:id', verifyToken, isEmpresa, deleteEmpresa);

module.exports = router;