const { body, validationResult } = require('express-validator');

// Middleware to validate student registration fields
const validarCamposEstudiante = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  
  body('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
  
  body('email')
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('Debe ingresar un correo electrónico válido'),
  
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  
  body('carrera')
    .notEmpty().withMessage('La carrera es obligatoria'),
  
  body('semestre')
    .optional()
    .isInt({ min: 1, max: 10 }).withMessage('El semestre debe ser un número entre 1 y 10'),
  
  body('telefono')
    .optional()
    .matches(/^[0-9]{10}$/).withMessage('El teléfono debe tener 10 dígitos'),
  
  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

// Middleware to validate company registration fields
const validarCamposEmpresa = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('Debe ingresar un correo electrónico válido'),
  
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  
  body('direccion')
    .optional()
    .isLength({ max: 200 }).withMessage('La dirección no debe exceder los 200 caracteres'),
  
  body('telefono')
    .optional()
    .matches(/^[0-9]{10}$/).withMessage('El teléfono debe tener 10 dígitos'),
  
  body('tipo')
    .optional()
    .isIn(['pequeña', 'mediana', 'grande']).withMessage('El tipo debe ser pequeña, mediana o grande'),
  
  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validarCamposEstudiante,
  validarCamposEmpresa
};