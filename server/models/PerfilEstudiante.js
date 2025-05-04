const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Estudiante = require('./Estudiante');

const PerfilEstudiante = sequelize.define('PerfilEstudiante', {
  id_perfil_estudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fk_estudiante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'estudiantes',
      key: 'id_estudiante'
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  foto_perfil: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cv_document: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'perfil_estudiante',
  timestamps: true
});

// Define association with Estudiante
PerfilEstudiante.belongsTo(Estudiante, {
  foreignKey: 'fk_estudiante',
  as: 'estudiante'
});

Estudiante.hasOne(PerfilEstudiante, {
  foreignKey: 'fk_estudiante',
  as: 'perfil'
});

module.exports = PerfilEstudiante;