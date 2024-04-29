const {Router} = require('express')
const router = Router()

const {createUsu, getUsu, deleteUsu, updateUsu, loginUsu, logoutUsu, getUsuarioActual}= require('../controller/usuario.controller')



router.route('/auth/login')
    .post(loginUsu)
    

router.route('/auth/logout')
    .post(logoutUsu)

router.route('/auth/sesion')
    .get(getUsuarioActual)

router.route('/:id')
    .delete(deleteUsu)
    .put(updateUsu)

router.route('/')
    .get(getUsu)
    .post(createUsu)
    
module.exports = router;