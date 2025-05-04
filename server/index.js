// Main entry point for the Student Job Board application
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const puestoRoutes = require('./routes/puestoRoutes');
const postulacionRoutes = require('./routes/postulacionRoutes');
const perfilEstudianteRoutes = require('./routes/perfilEstudianteRoutes');
const perfilEmpresaRoutes = require('./routes/perfilEmpresaRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/puestos', puestoRoutes);
app.use('/api/postulaciones', postulacionRoutes);
app.use('/api/perfiles/estudiantes', perfilEstudianteRoutes);
app.use('/api/perfiles/empresas', perfilEmpresaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Define port
const PORT = process.env.PORT || 3000;

// Start server after database connection
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    
    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log('Todos los modelos fueron sincronizados correctamente.');
    
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

startServer();