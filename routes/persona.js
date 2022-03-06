const express = require('express')
const router = express.Router()
const personController = require('../controllers/personaController')


// Clientes
router.get('/clientes', personController.listClientes)

/* POST CLIENTES */
router.post('/clientes/new', personController.newCliente)


// Empleados
router.get('/empleados', personController.listEmpleados)

/* POST EMPLEADOS */
router.post('/empleados/new', personController.newEmpleado)

// -- GET Empleados JSON
router.get('/empleados/:id', personController.getEmpleadobyId)


// Lugares JSON
router.get('/ciudad/:id', personController.getDeptoByCiudad)

module.exports = router