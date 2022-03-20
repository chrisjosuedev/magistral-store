const express = require('express')
const router = express.Router()
const consultasController = require('../controllers/consultasController')

// Ver compras
router.get('/compras', consultasController.listCompras)

// JSON Compras
router.get('/compras/listado', consultasController.totalCompras)

// Ver compras por rango de fechas
router.get('/compras/fecha/:fechain/:fechaout', consultasController.findCompraByDate)

// Ver detalle de la compra
router.get('/compras/detalle/:id', consultasController.getCompraByID)


module.exports = router