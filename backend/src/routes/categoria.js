const {Router} = require('express')
const router = Router()

const {createProd, getCateg, getCategoria, deleteProd, updateProd}= require('../controller/categoria.controller')

router.route('/')

    .get(getCateg)
    .post(createProd)

router.route('/:id')
    .get(getCategoria)
    .delete(deleteProd)
    .put(updateProd)

module.exports = router;