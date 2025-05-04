const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Empresa = require('./Empresa');

const PerfilEmpresa = sequelize.define('PerfilEmpresa', {
  id_perfil_empresa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fk_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empresas',
      key: 'id_empresa'
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  foto_perfil: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'empresa_perfil',
  timestamps: true
});

// Define association with Empresa
PerfilEmpresa.belongsTo(Empresa, {
  foreignKey: 'fk_empresa',
  as: 'empresa'
});

Empresa.hasOne(PerfilEmpresa, {
  foreignKey: 'fk_empresa',
  as: 'perfil'
});

module.exports = PerfilEmpresa;