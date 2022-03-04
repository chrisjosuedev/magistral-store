const express = require('express')
const router = express.Router()
const personController = require('../controllers/personaController')


// Clientes
router.get('/clientes', personController.listClientes)


// Empleados
router.get('/empleados', personController.listEmpleados)

module.exports = router