const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Empresa = require('./Empresa');
const PerfilEmpresa = require('./PerfilEmpresa');

const Puesto = sequelize.define('Puesto', {
  id_puesto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fk_empresa_perfil: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empresa_perfil',
      key: 'id_perfil_empresa'
    }
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requisitos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  modalidad: {
    type: DataTypes.ENUM('presencial', 'remoto', 'híbrido'),
    allowNull: true
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status_puesto: {
    type: DataTypes.ENUM('activo', 'inactivo', 'cerrado'),
    defaultValue: 'activo'
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_cierre: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'puestos',
  timestamps: true
});

// Define associations
Puesto.belongsTo(PerfilEmpresa, {
  foreignKey: 'fk_empresa_perfil',
  as: 'perfilEmpresa'
});

PerfilEmpresa.hasMany(Puesto, {
  foreignKey: 'fk_empresa_perfil',
  as: 'puestos'
});

module.exports = Puesto;