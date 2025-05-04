const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Estudiante = require('./Estudiante');
const Puesto = require('./Puesto');

const Postulacion = sequelize.define('Postulacion', {
  id_postulacion: {
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
  fk_puesto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'puestos',
      key: 'id_puesto'
    }
  },
  fecha_postulacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status_postulacion: {
    type: DataTypes.ENUM('pendiente', 'revisada', 'entrevista', 'rechazada', 'aceptada'),
    defaultValue: 'pendiente'
  },
  comentarios: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'postulaciones',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['fk_estudiante', 'fk_puesto']
    }
  ]
});

// Define associations
Postulacion.belongsTo(Estudiante, {
  foreignKey: 'fk_estudiante',
  as: 'estudiante'
});

Postulacion.belongsTo(Puesto, {
  foreignKey: 'fk_puesto',
  as: 'puesto'
});

Estudiante.hasMany(Postulacion, {
  foreignKey: 'fk_estudiante',
  as: 'postulaciones'
});

Puesto.hasMany(Postulacion, {
  foreignKey: 'fk_puesto',
  as: 'postulaciones'
});

module.exports = Postulacion;