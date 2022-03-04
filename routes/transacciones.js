const express = require('express')
const router = express.Router()
const transaccionCont = require('../controllers/transaccionesController')


router.get('/metodos-pago', transaccionCont.listMetodosPago)



module.exports = router

