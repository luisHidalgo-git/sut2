const { PerfilEstudiante, Estudiante } = require('../models');

/**
 * Create or update student profile
 */
const updatePerfilEstudiante = async (req, res) => {
  try {
    const estudianteId = req.user.id;
    const { descripcion } = req.body;
    
    // Check if profile exists
    let perfil = await PerfilEstudiante.findOne({
      where: { fk_estudiante: estudianteId }
    });
    
    if (perfil) {
      // Update existing profile
      await perfil.update({
        descripcion: descripcion || perfil.descripcion,
        foto_perfil: req.file ? req.file.filename : perfil.foto_perfil
      });
    } else {
      // Create new profile
      perfil = await PerfilEstudiante.create({
        fk_estudiante: estudianteId,
        descripcion,
        foto_perfil: req.file ? req.file.filename : null
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Perfil de estudiante actualizado correctamente',
      data: perfil
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar perfil de estudiante',
      error: error.message
    });
  }
};

/**
 * Upload CV document
 */
const uploadCV = async (req, res) => {
  try {
    const estudianteId = req.user.id;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se ha proporcionado ningún archivo'
      });
    }
    
    // Check if profile exists
    let perfil = await PerfilEstudiante.findOne({
      where: { fk_estudiante: estudianteId }
    });
    
    if (perfil) {
      // Update existing profile
      await perfil.update({
        cv_document: req.file.filename
      });
    } else {
      // Create new profile
      perfil = await PerfilEstudiante.create({
        fk_estudiante: estudianteId,
        cv_document: req.file.filename
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'CV subido correctamente',
      data: {
        cv_document: perfil.cv_document
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al subir CV',
      error: error.message
    });
  }
};

/**
 * Get student profile
 */
const getPerfilEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    
    const perfil = await PerfilEstudiante.findOne({
      where: { fk_estudiante: id },
      include: [
        {
          model: Estudiante,
          as: 'estudiante',
          attributes: ['id_estudiante', 'nombre', 'apellido', 'email', 'carrera', 'semestre']
        }
      ]
    });
    
    if (!perfil) {
      return res.status(404).json({
        success: false,
        message: 'Perfil de estudiante no encontrado'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: perfil
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener perfil de estudiante',
      error: error.message
    });
  }
};

module.exports = {
  updatePerfilEstudiante,
  uploadCV,
  getPerfilEstudiante
};