const {Router} = require('express')
const router = Router()

const {createProd, getProd, getProducto, deleteProd, updateProd}= require('../controller/producto.controller')

router.route('/')

    .get(getProd)
    .post(createProd)

router.route('/:id')
    .get(getProducto)
    .delete(deleteProd)
    .put(updateProd)

module.exports = router;