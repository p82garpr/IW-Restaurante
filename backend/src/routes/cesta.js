const {Router} = require('express')
const router = Router()

const {createCesta, getCesta, updateCesta}= require('../controller/cesta.controller')

router.route('/')

    .post(createCesta)

router.route('/:id')
    .get(getCesta)
    .put(updateCesta);


module.exports = router;