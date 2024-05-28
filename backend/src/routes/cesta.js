const { Router } = require('express');
const router = Router();

const { addProductoCesta, getCesta, updateCesta, deleteProductoCesta, deleteCesta } = require('../controller/cesta.controller');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.route('/')
    .post(isAuthenticated, addProductoCesta)
    .get(isAuthenticated, getCesta)
    .delete(isAuthenticated, deleteCesta);

router.route('/:id')
    .put(isAuthenticated, updateCesta)
    .delete(isAuthenticated, deleteProductoCesta);

module.exports = router;
