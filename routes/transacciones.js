const express = require('express')
const router = express.Router()
const transaccionCont = require('../controllers/transaccionesController')


/** METODOS DE PAGO **/
router.get('/metodos-pago', transaccionCont.listMetodosPago)

router.post('/metodos-pago/new', transaccionCont.newMetodoPago)



module.exports = router

