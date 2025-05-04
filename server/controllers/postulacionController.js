const { Postulacion, Puesto, Estudiante, PerfilEmpresa, Empresa } = require('../models');

/**
 * Create a new application
 */
const createPostulacion = async (req, res) => {
  try {
    const estudianteId = req.user.id;
    const { puestoId } = req.body;
    
    // Check if job position exists
    const puesto = await Puesto.findByPk(puestoId);
    if (!puesto) {
      return res.status(404).json({
        success: false,
        message: 'Puesto no encontrado'
      });
    }
    
    // Check if job position is active
    if (puesto.status_puesto !== 'activo') {
      return res.status(400).json({
        success: false,
        message: 'No se puede postular a un puesto inactivo o cerrado'
      });
    }
    
    // Check if student has already applied to this job position
    const existingPostulacion = await Postulacion.findOne({
      where: {
        fk_estudiante: estudianteId,
        fk_puesto: puestoId
      }
    });
    
    if (existingPostulacion) {
      return res.status(400).json({
        success: false,
        message: 'Ya te has postulado a este puesto'
      });
    }
    
    // Create application
    const postulacion = await Postulacion.create({
      fk_estudiante: estudianteId,
      fk_puesto: puestoId
    });
    
    return res.status(201).json({
      success: true,
      message: 'Postulación creada exitosamente',
      data: postulacion
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear postulación',
      error: error.message
    });
  }
};

/**
 * Get all applications for a company
 */
const getEmpresaPostulaciones = async (req, res) => {
  try {
    const empresaId = req.user.id;
    const { puestoId, status } = req.query;
    
    // Get company profile
    const perfilEmpresa = await PerfilEmpresa.findOne({
      where: { fk_empresa: empresaId }
    });
    
    if (!perfilEmpresa) {
      return res.status(404).json({
        success: false,
        message: 'Perfil de empresa no encontrado'
      });
    }
    
    // Build query for company job positions
    const puestosQuery = {
      where: { fk_empresa_perfil: perfilEmpresa.id_perfil_empresa }
    };
    
    if (puestoId) {
      puestosQuery.where.id_puesto = puestoId;
    }
    
    // Get company job positions
    const puestos = await Puesto.findAll(puestosQuery);
    const puestosIds = puestos.map(puesto => puesto.id_puesto);
    
    if (puestosIds.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }
    
    // Build query for applications
    const postulacionesQuery = {
      where: { fk_puesto: puestosIds },
      include: [
        {
          model: Estudiante,
          as: 'estudiante',
          attributes: ['id_estudiante', 'nombre', 'apellido', 'email', 'carrera', 'semestre']
        },
        {
          model: Puesto,
          as: 'puesto',
          attributes: ['id_puesto', 'titulo', 'status_puesto']
        }
      ],
      order: [['createdAt', 'DESC']]
    };
    
    if (status) {
      postulacionesQuery.where.status_postulacion = status;
    }
    
    // Get applications
    const postulaciones = await Postulacion.findAll(postulacionesQuery);
    
    return res.status(200).json({
      success: true,
      count: postulaciones.length,
      data: postulaciones
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener postulaciones',
      error: error.message
    });
  }
};

/**
 * Get all applications for a student
 */
const getEstudiantePostulaciones = async (req, res) => {
  try {
    const estudianteId = req.user.id;
    const { status } = req.query;
    
    // Build query
    const query = {
      where: { fk_estudiante: estudianteId },
      include: [
        {
          model: Puesto,
          as: 'puesto',
          include: [
            {
              model: PerfilEmpresa,
              as: 'perfilEmpresa',
              include: [
                {
                  model: Empresa,
                  as: 'empresa',
                  attributes: ['id_empresa', 'nombre']
                }
              ]
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    };
    
    if (status) {
      query.where.status_postulacion = status;
    }
    
    // Get applications
    const postulaciones = await Postulacion.findAll(query);
    
    return res.status(200).json({
      success: true,
      count: postulaciones.length,
      data: postulaciones
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener postulaciones',
      error: error.message
    });
  }
};

/**
 * Update application status
 */
const updatePostulacionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comentarios } = req.body;
    const empresaId = req.user.id;
    
    // Get application
    const postulacion = await Postulacion.findByPk(id, {
      include: [
        {
          model: Puesto,
          as: 'puesto',
          include: [
            {
              model: PerfilEmpresa,
              as: 'perfilEmpresa'
            }
          ]
        }
      ]
    });
    
    if (!postulacion) {
      return res.status(404).json({
        success: false,
        message: 'Postulación no encontrada'
      });
    }
    
    // Check if company owns the job position
    if (postulacion.puesto.perfilEmpresa.fk_empresa !== empresaId) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para actualizar esta postulación'
      });
    }
    
    // Update application status
    await postulacion.update({
      status_postulacion: status,
      comentarios: comentarios || postulacion.comentarios
    });
    
    return res.status(200).json({
      success: true,
      message: 'Estado de postulación actualizado correctamente',
      data: postulacion
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar estado de postulación',
      error: error.message
    });
  }
};

/**
 * Get application by ID
 */
const getPostulacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userTipo = req.user.tipo;
    
    // Get application
    const postulacion = await Postulacion.findByPk(id, {
      include: [
        {
          model: Estudiante,
          as: 'estudiante',
          attributes: ['id_estudiante', 'nombre', 'apellido', 'email', 'carrera', 'semestre']
        },
        {
          model: Puesto,
          as: 'puesto',
          include: [
            {
              model: PerfilEmpresa,
              as: 'perfilEmpresa',
              include: [
                {
                  model: Empresa,
                  as: 'empresa',
                  attributes: ['id_empresa', 'nombre']
                }
              ]
            }
          ]
        }
      ]
    });
    
    if (!postulacion) {
      return res.status(404).json({
        success: false,
        message: 'Postulación no encontrada'
      });
    }
    
    // Check if user is authorized to view this application
    if (
      (userTipo === 'estudiante' && postulacion.fk_estudiante !== userId) ||
      (userTipo === 'empresa' && postulacion.puesto.perfilEmpresa.fk_empresa !== userId)
    ) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para ver esta postulación'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: postulacion
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener postulación',
      error: error.message
    });
  }
};

/**
 * Delete application
 */
const deletePostulacion = async (req, res) => {
  try {
    const { id } = req.params;
    const estudianteId = req.user.id;
    
    // Get application
    const postulacion = await Postulacion.findByPk(id);
    
    if (!postulacion) {
      return res.status(404).json({
        success: false,
        message: 'Postulación no encontrada'
      });
    }
    
    // Check if student owns the application
    if (postulacion.fk_estudiante !== estudianteId) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para eliminar esta postulación'
      });
    }
    
    // Delete application
    await postulacion.destroy();
    
    return res.status(200).json({
      success: true,
      message: 'Postulación eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar postulación',
      error: error.message
    });
  }
};

module.exports = {
  createPostulacion,
  getEmpresaPostulaciones,
  getEstudiantePostulaciones,
  updatePostulacionStatus,
  getPostulacionById,
  deletePostulacion
};