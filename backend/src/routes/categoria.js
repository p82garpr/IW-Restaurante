const {Router} = require('express')
const router = Router()

const {getCateg, getCategoria}= require('../controller/categoria.controller')

router.route('/')

    .get(getCateg)

router.route('/:id')
    .get(getCategoria)

module.exports = router;