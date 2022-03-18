const express = require('express')
const router = express.Router()
const transaccionCont = require('../controllers/transaccionesController')


/** METODOS DE PAGO **/
router.get('/metodos-pago', transaccionCont.listMetodosPago)

router.post('/metodos-pago/new', transaccionCont.newMetodoPago)

router.get('/metodos-pago/:id', transaccionCont.getMetodoPago)

router.post('/metodos-pago/edit/:id', transaccionCont.editMetodoPago)

router.get('/metodos-pago/delete/:id', transaccionCont.deleteMetodoPago)

/** COMPRAS **/
router.get('/compras/new', transaccionCont.newCompra)

router.post('/compras/agregar', transaccionCont.agregarCompra)

/** FACTURAS **/
router.get('/facturas/new', transaccionCont.newFactura)

module.exports = router

