const { Router } = require('express');
const router = Router();

const { createProd, getProd, getProducto, deleteProd, updateProd } = require('../controller/producto.controller');
const { isAuthenticated, hasPrivilege } = require('../middleware/authMiddleware');

router.post('/', isAuthenticated, hasPrivilege(1), createProd);

router.route('/:id')
    .get(isAuthenticated, getProducto)
    .delete(isAuthenticated, hasPrivilege(1), deleteProd)
    .put(isAuthenticated, hasPrivilege(1), updateProd);

// Ruta para obtener todos los productos o filtrar por categoría
router.get('/categoria/:categoria?', isAuthenticated, getProd);

module.exports = router;
