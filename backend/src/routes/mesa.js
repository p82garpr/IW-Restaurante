const { Router } = require('express');
const router = Router();

const { createMesa, getMesa, getMesas, deleteMesa, updateMesa } = require('../controller/mesa.controller');
const { isAuthenticated, hasPrivilege } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, getMesas);
router.post('/', isAuthenticated, hasPrivilege(1), createMesa);

router.route('/:id')
    .get(isAuthenticated, getMesa)
    .delete(isAuthenticated, hasPrivilege(1), deleteMesa)
    .put(isAuthenticated, hasPrivilege(1), updateMesa);

module.exports = router;
