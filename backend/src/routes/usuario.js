const Usuario = require('../models/Usuario');
const { Router } = require('express');
const router = Router();
const { createUsu, getUsu, deleteUsu, updateUsu, loginUsu, logoutUsu, getUsuarioActual } = require('../controller/usuario.controller');
const { isAuthenticated, hasPrivilege } = require('../middleware/authMiddleware');

router.route('/')
    .get(isAuthenticated, hasPrivilege(1), getUsu)  // Obtener lista de usuarios requiere autenticación y privilegio 1
    .post(createUsu);  // Crear un usuario 

router.route('/auth/login')
    .post(loginUsu);

router.route('/auth/logout')
    .post(isAuthenticated, logoutUsu);  // Cerrar sesión requiere autenticación

router.route('/auth/sesion')
    .get(isAuthenticated, async (req, res) => {
        try {
            if (!req.session) {
                return res.status(401).json({ message: 'Sesión no inicializada' });
            }

            if (!req.session.usuarioId) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }

            const usuario = await Usuario.findById(req.session.usuarioId, { contraseña: 0 }); // Excluir la contraseña
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

router.route('/:id')
    .delete(isAuthenticated, hasPrivilege(1), deleteUsu)  // Eliminar un usuario requiere autenticación y privilegio 1
    .put(isAuthenticated, updateUsu)  // Actualizar un usuario requiere autenticación y privilegio 1
    .get(isAuthenticated, getUsuarioActual);  // Obtener usuario actual requiere autenticación

module.exports = router;
