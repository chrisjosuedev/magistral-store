const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')

// /dashboard
router.get('/', dashboardController.dashboardData)

// Ventas de los ultimos 5 dias
router.get('/ventas/diarias', dashboardController.ventasDiarias)

// Stock
router.get('/stock', dashboardController.totalStock)

module.exports = router