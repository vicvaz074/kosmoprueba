const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Importa path para manejar rutas de archivos
require('dotenv').config();
const authMiddleware = require('./src/authMiddleware.js');
const authRoutes = require('./src/authRoutes.js');

const app = express();

// Middleware de CORS
app.use(cors());

app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Importar rutas de autenticación
app.use(authRoutes);

// Rutas protegidas como ejemplo
app.get('/tryme', authMiddleware, (req, res) => {
  res.send('Dashboard Accesible');
});

app.get('/store', authMiddleware, (req, res) => {
  res.send('Store content is protected');
});

// Configuración para servir los archivos estáticos de React
// Asume que `npm run build` se ejecuta en tu proyecto React y que `build` se mueve/copie dentro de tu directorio backend
app.use(express.static(path.join(__dirname, 'build')));

// Para cualquier otra ruta no manejada por tus rutas de API, sirve el index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
