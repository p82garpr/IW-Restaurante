const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt');
const {Router} = require('express')
const router = Router()

const {createUsu, getUsu, deleteUsu, updateUsu, loginUsu, logoutUsu, getUsuarioActual}= require('../controller/usuario.controller')



router.route('/auth/login')
    .post(async (req, res) => {
        const { nombre_usuario, contraseña } = req.body;
    
        try {
            const usuario = await Usuario.findOne({ nombre_usuario });
    
            if (!usuario) {
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            }
    
            const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    
            if (!contraseñaValida) {
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            }
    
            // Almacenar el ID del usuario en la sesión
            req.session.usuarioId = usuario._id.toString();
            req.session.hola = 'hola';
            console.log(req.session);
            
            //console.log(req.session.usuarioId);
            res.json({ message: 'Inicio de sesión exitoso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    
/*router.route('/auth/logout')
    .post(logoutUsu)*/

router.route('/auth/sesion')
    .get(async (req, res) => {
    
        try {
            if(!req.session){
                return res.status(401).json({ message: 'Sesión no inicializada' });
            }
            req.session.adios = 'adios';
            console.log(req.session.hola);
            console.log(req.session);
            if (!req.session.usuarioId) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }
            
            //console.log(req.session.usuarioId);
    
            const usuario = await Usuario.findById(req.session.usuarioId, { contraseña: 0 }); // Excluir la contraseña
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

router.route('/:id')
    .delete(deleteUsu)
    .put(updateUsu)

router.route('/')
    .get(getUsu)
    .post(createUsu)

module.exports = router;