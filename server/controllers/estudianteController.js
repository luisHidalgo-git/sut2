const { Estudiante, PerfilEstudiante } = require('../models');

/**
 * Get all students
 */
const getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({
      attributes: { exclude: ['password'] }
    });
    
    return res.status(200).json({
      success: true,
      data: estudiantes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener estudiantes',
      error: error.message
    });
  }
};

/**
 * Get student by ID
 */
const getEstudianteById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const estudiante = await Estudiante.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: PerfilEstudiante,
          as: 'perfil'
        }
      ]
    });
    
    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: estudiante
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener estudiante',
      error: error.message
    });
  }
};

/**
 * Update student
 */
const updateEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, carrera, semestre, telefono } = req.body;
    
    // Check if the authenticated user is the same as the requested user
    if (req.user.tipo === 'estudiante' && parseInt(req.user.id) !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para actualizar este estudiante'
      });
    }
    
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }
    
    // Update student
    await estudiante.update({
      nombre: nombre || estudiante.nombre,
      apellido: apellido || estudiante.apellido,
      carrera: carrera || estudiante.carrera,
      semestre: semestre || estudiante.semestre,
      telefono: telefono || estudiante.telefono
    });
    
    return res.status(200).json({
      success: true,
      message: 'Estudiante actualizado correctamente',
      data: {
        id: estudiante.id_estudiante,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        email: estudiante.email,
        carrera: estudiante.carrera,
        semestre: estudiante.semestre,
        telefono: estudiante.telefono
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar estudiante',
      error: error.message
    });
  }
};

/**
 * Delete student
 */
const deleteEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if the authenticated user is the same as the requested user
    if (req.user.tipo === 'estudiante' && parseInt(req.user.id) !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para eliminar este estudiante'
      });
    }
    
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }
    
    // Delete student
    await estudiante.destroy();
    
    return res.status(200).json({
      success: true,
      message: 'Estudiante eliminado correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar estudiante',
      error: error.message
    });
  }
};

module.exports = {
  getAllEstudiantes,
  getEstudianteById,
  updateEstudiante,
  deleteEstudiante
};