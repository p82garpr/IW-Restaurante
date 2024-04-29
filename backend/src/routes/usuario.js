const {Router} = require('express')
const router = Router()

const {createUsu, getUsu, getUsuario, deleteUsu, updateUsu, loginUsu}= require('../controller/usuario.controller')

router.route('/')

    .get(getUsu)
    .post(createUsu)

router.route('/:id')
    .get(getUsuario)
    .delete(deleteUsu)
    .put(updateUsu)

router.route('/')

router.route('/auth/login')
    .post(loginUsu)

router.route('/auth/logout')
    .post(logoutUsu)


module.exports = router;