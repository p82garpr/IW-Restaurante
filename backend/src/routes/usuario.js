const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt');
const {Router} = require('express')
const router = Router()

const {createUsu, getUsu, deleteUsu, updateUsu, loginUsu, logoutUsu, getUsuarioActual}= require('../controller/usuario.controller')


router.route('/')
    .get(getUsu)
    .post(createUsu)  

router.route('/auth/login')
    .post(loginUsu)
    
router.route('/auth/logout')
    .post(logoutUsu)

router.route('/auth/sesion')
    .get(async (req, res) => {
    
        try {
            if(!req.session){
                return res.status(401).json({ message: 'Sesión no inicializada' });
            }
           
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
    .get(getUsuarioActual)



module.exports = router;