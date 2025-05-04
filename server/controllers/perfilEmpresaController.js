const { PerfilEmpresa, Empresa } = require('../models');

/**
 * Create or update company profile
 */
const updatePerfilEmpresa = async (req, res) => {
  try {
    const empresaId = req.user.id;
    const { descripcion } = req.body;
    
    // Check if profile exists
    let perfil = await PerfilEmpresa.findOne({
      where: { fk_empresa: empresaId }
    });
    
    if (perfil) {
      // Update existing profile
      await perfil.update({
        descripcion: descripcion || perfil.descripcion,
        foto_perfil: req.file ? req.file.filename : perfil.foto_perfil
      });
    } else {
      // Create new profile
      perfil = await PerfilEmpresa.create({
        fk_empresa: empresaId,
        descripcion,
        foto_perfil: req.file ? req.file.filename : null
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Perfil de empresa actualizado correctamente',
      data: perfil
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar perfil de empresa',
      error: error.message
    });
  }
};

/**
 * Get company profile
 */
const getPerfilEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    
    const perfil = await PerfilEmpresa.findOne({
      where: { fk_empresa: id },
      include: [
        {
          model: Empresa,
          as: 'empresa',
          attributes: ['id_empresa', 'nombre', 'email', 'direccion', 'tipo']
        }
      ]
    });
    
    if (!perfil) {
      return res.status(404).json({
        success: false,
        message: 'Perfil de empresa no encontrado'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: perfil
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener perfil de empresa',
      error: error.message
    });
  }
};

module.exports = {
  updatePerfilEmpresa,
  getPerfilEmpresa
};