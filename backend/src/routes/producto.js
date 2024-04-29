const {Router} = require('express')
const router = Router()

const {createProd, getProd, getProducto, deleteProd, updateProd}= require('../controller/producto.controller')



router.post('/', createProd);

router.route('/:id')
    .get(getProducto)
    .delete(deleteProd)
    .put(updateProd);


// Ruta para obtener todos los productos o filtrar por categoría
router.get('/categoria/:categoria?', getProd);
//consulta para esta api: http://localhost:4000/api/productos/categoria/entrante

module.exports = router;