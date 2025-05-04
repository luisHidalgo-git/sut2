const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const { bcrypt: bcryptConfig } = require('../config/auth');

const Estudiante = sequelize.define('Estudiante', {
  id_estudiante: {
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
  apellido: {
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
  carrera: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semestre: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  },
  telefono: {
    type: DataTypes.STRING,
    validate: {
      is: /^[0-9]{10}$/
    }
  }
}, {
  tableName: 'estudiantes',
  timestamps: true,
  hooks: {
    // Hash password before save
    beforeCreate: async (estudiante) => {
      if (estudiante.password) {
        estudiante.password = await bcrypt.hash(
          estudiante.password, 
          bcryptConfig.saltRounds
        );
      }
    },
    beforeUpdate: async (estudiante) => {
      if (estudiante.changed('password')) {
        estudiante.password = await bcrypt.hash(
          estudiante.password, 
          bcryptConfig.saltRounds
        );
      }
    }
  }
});

// Instance method to check password
Estudiante.prototype.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Estudiante;