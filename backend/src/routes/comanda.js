const {Router} = require('express')
const router = Router()

const {createComanda, getComanda, getComandas, deleteComanda, updateComanda}= require('../controller/comanda.controller')



router.post('/', createComanda);
router.get('/', getComandas);


router.route('/:id')
    .get(getComanda)
    .delete(deleteComanda)
    .put(updateComanda);



module.exports = router;