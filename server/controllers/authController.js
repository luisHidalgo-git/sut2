const jwt = require('jsonwebtoken');
const { Estudiante, Empresa } = require('../models');
const { jwt: jwtConfig } = require('../config/auth');

/**
 * Register a new student
 */
const registerEstudiante = async (req, res) => {
  try {
    const { nombre, apellido, email, password, carrera, semestre, telefono } = req.body;

    // Check if student already exists
    const estudianteExistente = await Estudiante.findOne({ where: { email } });
    if (estudianteExistente) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico ya está registrado'
      });
    }

    // Create new student
    const estudiante = await Estudiante.create({
      nombre,
      apellido,
      email,
      password,
      carrera,
      semestre,
      telefono
    });

    // Generate token
    const token = jwt.sign(
      { id: estudiante.id_estudiante, tipo: 'estudiante', email: estudiante.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return res.status(201).json({
      success: true,
      message: 'Estudiante registrado exitosamente',
      token,
      estudiante: {
        id: estudiante.id_estudiante,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        email: estudiante.email,
        carrera: estudiante.carrera,
        semestre: estudiante.semestre
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al registrar estudiante',
      error: error.message
    });
  }
};

/**
 * Register a new company
 */
const registerEmpresa = async (req, res) => {
  try {
    const { nombre, email, password, direccion, telefono, tipo } = req.body;

    // Check if company already exists
    const empresaExistente = await Empresa.findOne({ where: { email } });
    if (empresaExistente) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico ya está registrado'
      });
    }

    // Create new company
    const empresa = await Empresa.create({
      nombre,
      email,
      password,
      direccion,
      telefono,
      tipo
    });

    // Generate token
    const token = jwt.sign(
      { id: empresa.id_empresa, tipo: 'empresa', email: empresa.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return res.status(201).json({
      success: true,
      message: 'Empresa registrada exitosamente',
      token,
      empresa: {
        id: empresa.id_empresa,
        nombre: empresa.nombre,
        email: empresa.email,
        direccion: empresa.direccion,
        tipo: empresa.tipo
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al registrar empresa',
      error: error.message
    });
  }
};

/**
 * Unified login for students and companies
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user is a student
    let user = await Estudiante.findOne({ where: { email } });
    let userType = 'estudiante';

    // If not a student, check if user is a company
    if (!user) {
      user = await Empresa.findOne({ where: { email } });
      userType = 'empresa';
    }

    // If user is not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Check password
    const passwordIsValid = await user.checkPassword(password);
    if (!passwordIsValid) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: userType === 'estudiante' ? user.id_estudiante : user.id_empresa, tipo: userType, email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: userType === 'estudiante' ? user.id_estudiante : user.id_empresa, tipo: userType, email: user.email },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpiresIn }
    );

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      refreshToken,
      user: {
        id: userType === 'estudiante' ? user.id_estudiante : user.id_empresa,
        nombre: user.nombre,
        apellido: user.apellido, // Asegúrate de incluir este campo
        email: user.email,
        ...(userType === 'estudiante' ? { carrera: user.carrera, semestre: user.semestre } : { direccion: user.direccion, tipo: user.tipo })
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

/**
 * Refresh token
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(403).json({
        success: false,
        message: 'Refresh token es requerido'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
    
    // Generate new token
    const newToken = jwt.sign(
      { id: decoded.id, tipo: decoded.tipo, email: decoded.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return res.status(200).json({
      success: true,
      token: newToken
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token inválido o expirado',
      error: error.message
    });
  }
};

module.exports = {
  registerEstudiante,
  registerEmpresa,
  login, // Reemplaza loginEstudiante y loginEmpresa con esta función unificada
  refreshToken
};