const { Empresa, PerfilEmpresa } = require('../models');

/**
 * Get all companies
 */
const getAllEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll({
      attributes: { exclude: ['password'] }
    });
    
    return res.status(200).json({
      success: true,
      data: empresas
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener empresas',
      error: error.message
    });
  }
};

/**
 * Get company by ID
 */
const getEmpresaById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const empresa = await Empresa.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: PerfilEmpresa,
          as: 'perfil'
        }
      ]
    });
    
    if (!empresa) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: empresa
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener empresa',
      error: error.message
    });
  }
};

/**
 * Update company
 */
const updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono, tipo } = req.body;
    
    // Check if the authenticated user is the same as the requested company
    if (req.user.tipo === 'empresa' && parseInt(req.user.id) !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para actualizar esta empresa'
      });
    }
    
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }
    
    // Update company
    await empresa.update({
      nombre: nombre || empresa.nombre,
      direccion: direccion || empresa.direccion,
      telefono: telefono || empresa.telefono,
      tipo: tipo || empresa.tipo
    });
    
    return res.status(200).json({
      success: true,
      message: 'Empresa actualizada correctamente',
      data: {
        id: empresa.id_empresa,
        nombre: empresa.nombre,
        email: empresa.email,
        direccion: empresa.direccion,
        telefono: empresa.telefono,
        tipo: empresa.tipo
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar empresa',
      error: error.message
    });
  }
};

/**
 * Delete company
 */
const deleteEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if the authenticated user is the same as the requested company
    if (req.user.tipo === 'empresa' && parseInt(req.user.id) !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para eliminar esta empresa'
      });
    }
    
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }
    
    // Delete company
    await empresa.destroy();
    
    return res.status(200).json({
      success: true,
      message: 'Empresa eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar empresa',
      error: error.message
    });
  }
};

module.exports = {
  getAllEmpresas,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa
};