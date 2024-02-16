const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const User = require('./src/user.js');
const path = require('path');
const authMiddleware = require('./src/authMiddleware.js');
const authRoutes = require('./src/authRoutes.js');

const app = express();

// Middleware de CORS
app.use(cors());

app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Importar rutas de autenticación
app.use(authRoutes);

// Ruta protegida como ejemplo
app.get('/tryme', authMiddleware, (req, res) => {
  res.send('Dashboard Accesible');
});

app.get('/store', authMiddleware, (req, res) => {
  res.send('Store content is protected');
});

// Sirve los archivos estáticos de la carpeta build de React
// Coloca esta parte justo antes de la configuración de escucha del puerto
app.use(express.static(path.join(__dirname, 'build')));

// Maneja cualquier solicitud que no sea de la API para servir el archivo index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
