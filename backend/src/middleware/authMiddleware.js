
const Usuario = require('../models/Usuario');

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = async (req, res, next) => {
    if (!req.session || !req.session.usuarioId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const usuario = await Usuario.findById(req.session.usuarioId);
        if (!usuario) {
            return res.status(402).json({ message: 'Unauthorized' });
        }
        req.usuario = usuario; // Almacena el usuario en el objeto de la solicitud para uso posterior
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Middleware para verificar privilegios
const hasPrivilege = (privilegioRequerido) => {
    return (req, res, next) => {
        const { usuario } = req;
        if (usuario.privilegio < privilegioRequerido) {
            return res.status(403).json({ message: 'Forbidden: Insufficient privilege' });
        }
        next();
    };
};

module.exports = { isAuthenticated, hasPrivilege };
