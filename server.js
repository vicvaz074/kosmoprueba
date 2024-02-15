const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); // At the top of your server.js
const User = require('./src/user.js');
const authMiddleware = require('./src/authMiddleware.js'); // Asumiendo que tienes un middleware para autenticación
const authRoutes = require('./src/authRoutes.js'); // Ajusta la ruta según la ubicación de tu archivo

const app = express();
app.use(cors());
app.use(express.json());
// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Importar rutas

app.use(authRoutes); // Sin '/api' si prefieres no usar ese prefijo

// Ruta protegida como ejemplo
app.get('/tryme', authMiddleware, (req, res) => {
  res.send('Dashboard Accesible');
});

app.get('/store', authMiddleware, (req, res) => {
  // Your logic for the protected content
  res.send('Store content is protected');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
