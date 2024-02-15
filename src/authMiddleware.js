const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Se requiere un token para la autenticación');
  }
  
  try {
    const decoded = jwt.verify(token, 'tu_secreto');
    req.user = decoded;
  } catch (error) {
    return res.status(401).send('Token no válido');
  }

  return next();
};

module.exports = verifyToken;
