const {Router} = require('express')
const router = Router()

const {createProd, getProd, getProducto, deleteProd, updateProd}= require('../controller/producto.controller')

// Ruta para obtener todos los productos o filtrar por categoría
router.get('/:categoria?', getProd);

router.post('/', createProd);

router.route('/:id')
    .get(getProducto)
    .delete(deleteProd)
    .put(updateProd);


module.exports = router;