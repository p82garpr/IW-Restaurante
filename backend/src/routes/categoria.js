const {Router} = require('express')
const router = Router()

const {createProd, getCateg, getCategoria, deleteProd, updateProd}= require('../controller/categoria.controller')

router.route('/')

    .get(getCateg)

router.route('/:id')
    .get(getCategoria)

module.exports = router;