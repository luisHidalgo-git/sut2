const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database connection configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || 'DB_NAME',
  process.env.DB_USER || 'DB_USER',
  process.env.DB_PASSWORD || 'DB_PASSWORD',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = { sequelize };