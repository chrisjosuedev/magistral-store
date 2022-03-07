const express = require('express')
const router = express.Router()
const transaccionCont = require('../controllers/transaccionesController')


/** METODOS DE PAGO **/
router.get('/metodos-pago', transaccionCont.listMetodosPago)

router.post('/metodos-pago/new', transaccionCont.newMetodoPago)

router.get('/metodos-pago/:id', transaccionCont.getMetodoPago)

router.post('/metodos-pago/edit/:id', transaccionCont.editMetodoPago)

router.get('/metodos-pago/delete/:id', transaccionCont.deleteMetodoPago)

module.exports = router

