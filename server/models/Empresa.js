const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const { bcrypt: bcryptConfig } = require('../config/auth');

const Empresa = sequelize.define('Empresa', {
  id_empresa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 100]
    }
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^[0-9]{10}$/
    }
  },
  tipo: {
    type: DataTypes.ENUM('pequeña', 'mediana', 'grande'),
    allowNull: true
  }
}, {
  tableName: 'empresas',
  timestamps: true,
  hooks: {
    // Hash password before save
    beforeCreate: async (empresa) => {
      if (empresa.password) {
        empresa.password = await bcrypt.hash(
          empresa.password, 
          bcryptConfig.saltRounds
        );
      }
    },
    beforeUpdate: async (empresa) => {
      if (empresa.changed('password')) {
        empresa.password = await bcrypt.hash(
          empresa.password, 
          bcryptConfig.saltRounds
        );
      }
    }
  }
});

// Instance method to check password
Empresa.prototype.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Empresa;