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
 * Login for students
 */
const loginEstudiante = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const estudiante = await Estudiante.findOne({ where: { email } });
    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    // Check password
    const passwordIsValid = await estudiante.checkPassword(password);
    if (!passwordIsValid) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: estudiante.id_estudiante, tipo: 'estudiante', email: estudiante.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: estudiante.id_estudiante, tipo: 'estudiante', email: estudiante.email },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpiresIn }
    );

    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      refreshToken,
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
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

/**
 * Login for companies
 */
const loginEmpresa = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find company by email
    const empresa = await Empresa.findOne({ where: { email } });
    if (!empresa) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }

    // Check password
    const passwordIsValid = await empresa.checkPassword(password);
    if (!passwordIsValid) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: empresa.id_empresa, tipo: 'empresa', email: empresa.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: empresa.id_empresa, tipo: 'empresa', email: empresa.email },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpiresIn }
    );

    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      refreshToken,
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
  loginEstudiante,
  loginEmpresa,
  refreshToken
};