const {Router} = require('express')
const router = Router()

const {addProductoCesta, getCesta, updateCesta, deleteProductoCesta}= require('../controller/cesta.controller')

router.route('/')

    .post(addProductoCesta)
    .get(getCesta)

router.route('/:id')
    .put(updateCesta)
    .delete(deleteProductoCesta)


module.exports = router;