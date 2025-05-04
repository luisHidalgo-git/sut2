const { Puesto, PerfilEmpresa, Empresa } = require('../models');
const { Op } = require('sequelize');

/**
 * Create a new job position
 */
const createPuesto = async (req, res) => {
  try {
    const empresaId = req.user.id;
    const {
      titulo,
      descripcion,
      requisitos,
      salario,
      ubicacion,
      modalidad,
      horario,
      fecha_cierre
    } = req.body;
    
    // Get company profile
    const perfilEmpresa = await PerfilEmpresa.findOne({
      where: { fk_empresa: empresaId }
    });
    
    if (!perfilEmpresa) {
      return res.status(404).json({
        success: false,
        message: 'Debe crear un perfil de empresa antes de publicar puestos'
      });
    }
    
    // Create job position
    const puesto = await Puesto.create({
      fk_empresa_perfil: perfilEmpresa.id_perfil_empresa,
      titulo,
      descripcion,
      requisitos,
      salario,
      ubicacion,
      modalidad,
      horario,
      fecha_cierre
    });
    
    return res.status(201).json({
      success: true,
      message: 'Puesto creado exitosamente',
      data: puesto
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear puesto',
      error: error.message
    });
  }
};

/**
 * Get all job positions
 */
const getAllPuestos = async (req, res) => {
  try {
    const { search, modalidad, status, empresa } = req.query;
    
    // Build query filters
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { titulo: { [Op.iLike]: `%${search}%` } },
        { descripcion: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (modalidad) {
      whereClause.modalidad = modalidad;
    }
    
    if (status) {
      whereClause.status_puesto = status;
    } else {
      // By default, show only active positions
      whereClause.status_puesto = 'activo';
    }
    
    // Include options
    const includeOptions = [
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
    ];
    
    // Filter by company
    if (empresa) {
      includeOptions[0].include[0].where = { id_empresa: empresa };
    }
    
    // Get job positions
    const puestos = await Puesto.findAll({
      where: whereClause,
      include: includeOptions,
      order: [['createdAt', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      count: puestos.length,
      data: puestos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener puestos',
      error: error.message
    });
  }
};

/**
 * Get job position by ID
 */
const getPuestoById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const puesto = await Puesto.findByPk(id, {
      include: [
        {
          model: PerfilEmpresa,
          as: 'perfilEmpresa',
          include: [
            {
              model: Empresa,
              as: 'empresa',
              attributes: ['id_empresa', 'nombre', 'email', 'direccion']
            }
          ]
        }
      ]
    });
    
    if (!puesto) {
      return res.status(404).json({
        success: false,
        message: 'Puesto no encontrado'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: puesto
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener puesto',
      error: error.message
    });
  }
};

/**
 * Update job position
 */
const updatePuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const empresaId = req.user.id;
    const {
      titulo,
      descripcion,
      requisitos,
      salario,
      ubicacion,
      modalidad,
      horario,
      status_puesto,
      fecha_cierre
    } = req.body;
    
    // Get job position
    const puesto = await Puesto.findByPk(id, {
      include: [
        {
          model: PerfilEmpresa,
          as: 'perfilEmpresa'
        }
      ]
    });
    
    if (!puesto) {
      return res.status(404).json({
        success: false,
        message: 'Puesto no encontrado'
      });
    }
    
    // Check if company owns the job position
    if (puesto.perfilEmpresa.fk_empresa !== empresaId) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para actualizar este puesto'
      });
    }
    
    // Update job position
    await puesto.update({
      titulo: titulo || puesto.titulo,
      descripcion: descripcion || puesto.descripcion,
      requisitos: requisitos || puesto.requisitos,
      salario: salario || puesto.salario,
      ubicacion: ubicacion || puesto.ubicacion,
      modalidad: modalidad || puesto.modalidad,
      horario: horario || puesto.horario,
      status_puesto: status_puesto || puesto.status_puesto,
      fecha_cierre: fecha_cierre || puesto.fecha_cierre
    });
    
    return res.status(200).json({
      success: true,
      message: 'Puesto actualizado correctamente',
      data: puesto
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar puesto',
      error: error.message
    });
  }
};

/**
 * Delete job position
 */
const deletePuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const empresaId = req.user.id;
    
    // Get job position
    const puesto = await Puesto.findByPk(id, {
      include: [
        {
          model: PerfilEmpresa,
          as: 'perfilEmpresa'
        }
      ]
    });
    
    if (!puesto) {
      return res.status(404).json({
        success: false,
        message: 'Puesto no encontrado'
      });
    }
    
    // Check if company owns the job position
    if (puesto.perfilEmpresa.fk_empresa !== empresaId) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para eliminar este puesto'
      });
    }
    
    // Delete job position
    await puesto.destroy();
    
    return res.status(200).json({
      success: true,
      message: 'Puesto eliminado correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar puesto',
      error: error.message
    });
  }
};

/**
 * Get company job positions
 */
const getEmpresaPuestos = async (req, res) => {
  try {
    const empresaId = req.user.id;
    
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
    
    // Get company job positions
    const puestos = await Puesto.findAll({
      where: { fk_empresa_perfil: perfilEmpresa.id_perfil_empresa },
      order: [['createdAt', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      count: puestos.length,
      data: puestos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener puestos de la empresa',
      error: error.message
    });
  }
};

module.exports = {
  createPuesto,
  getAllPuestos,
  getPuestoById,
  updatePuesto,
  deletePuesto,
  getEmpresaPuestos
};