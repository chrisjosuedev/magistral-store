const express = require('express')
const router = express.Router()
const analiticasController = require('../controllers/analiticasController')


/* -----------------  Analiticas de Ventas ------------------- */

/* Render Analiticas de Ventas */
router.get('/ventas', analiticasController.ventasAnaliticas)

// Ventas por Dia
router.get('/ventas/diarias', analiticasController.ventasDiarias)

// Ventas por Mes
router.get('/ventas/mensuales', analiticasController.ventasMensuales)

// Articulos más vendidos
router.get('/ventas/articulos/masvendidos', analiticasController.articulosMasVendidos)

// Clientes con mayores compras
router.get('/ventas/clientes/masvendidos', analiticasController.clientesMasVendidos)

/* -----------------  Analiticas de Compras ------------------- */
/* Render Analiticas de Compras */
router.get('/compras', analiticasController.comprasAnaliticas)

// Compras por Dia
router.get('/compras/diarias', analiticasController.comprasDiarias)

// Ventas por Mes
router.get('/compras/mensuales', analiticasController.comprasMensuales)

// Articulos más vendidos
router.get('/compras/articulos/mascomprados', analiticasController.articulosMasComprados)

// Clientes con mayores compras
router.get('/compras/proveedores/mascomprados', analiticasController.proveedoresMasCompras)


module.exports = router

