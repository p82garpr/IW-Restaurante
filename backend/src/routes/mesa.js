const {Router} = require('express')
const router = Router()

const {createMesa, getMesa, getMesas, deleteMesa, updateMesa}= require('../controller/mesa.controller')


router.get('/',getMesas)

router.post('/', createMesa);

router.route('/:id')
    .get(getMesa)
    .delete(deleteMesa)
    .put(updateMesa);

module.exports = router;