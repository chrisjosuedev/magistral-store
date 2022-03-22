const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')
const { isLoggedIn } = require('../lib/auth')

// /dashboard
router.get('/', isLoggedIn, dashboardController.dashboardData)

// Ventas de los ultimos 5 dias
router.get('/ventas/diarias', isLoggedIn, dashboardController.ventasDiarias)

// Stock
router.get('/stock', isLoggedIn, dashboardController.totalStock)

module.exports = router