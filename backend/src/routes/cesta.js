const {Router} = require('express')
const router = Router()

const {addProductoCesta, getCesta, updateCesta, deleteProductoCesta,deleteCesta}= require('../controller/cesta.controller')

router.route('/')

    .post(addProductoCesta)
    .get(getCesta)
    .delete(deleteCesta)

router.route('/:id')
    .put(updateCesta)
    .delete(deleteProductoCesta)


module.exports = router;