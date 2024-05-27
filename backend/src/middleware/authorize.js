const Usuario = require('../models/Usuario');

// Middleware de autorización basado en privilegios
const authorizePrivilege = (requiredPrivilege) => {
  return async (req, res, next) => {
    try {
        
      const usuario = await Usuario.findById(req.usuario._id);
      if (!usuario) {
        return res.sendStatus(404); // Usuario no encontrado
      }
      if (usuario.privilegio < requiredPrivilege) {
        return res.sendStatus(403); // Privilegios insuficientes
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { authorizePrivilege };
