const { Router } = require('express');
const router = Router();

const { createComanda, getComanda, getComandas, deleteComanda, updateComanda } = require('../controller/comanda.controller');
const { isAuthenticated, hasPrivilege } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, getComandas);
router.post('/', isAuthenticated, createComanda);

router.route('/:id')
    .get(isAuthenticated, getComanda)
    .delete(isAuthenticated, hasPrivilege(1), deleteComanda)
    .put(isAuthenticated, updateComanda);

module.exports = router;
