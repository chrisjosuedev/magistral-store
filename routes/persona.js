const express = require('express')
const router = express.Router()
const personController = require('../controllers/personaController')


// Clientes
router.get('/clientes', personController.listClientes)

/* POST CLIENTES */
router.post('/clientes/new', personController.newCliente)

// Edit Clientes
router.get('/clientes/:id', personController.getClienteById)

router.post('/clientes/edit/:id', personController.editCliente)

// Eliminar
router.get('/clientes/delete/:id', personController.deleteCliente)

// Empleados
router.get('/empleados', personController.listEmpleados)

/* POST EMPLEADOS */
router.post('/empleados/new', personController.newEmpleado)

// Edit Empleado
router.get('/empleados/:id', personController.getEmpleadoById)

router.post('/empleados/edit/:id', personController.editEmpleado)

// Eliminar
router.get('/empleados/delete/:id', personController.deleteEmpleado)

// -- GET Empleados JSON
router.get('/empleados/:id', personController.getEmpleadobyId)


// Lugares JSON
router.get('/ciudad/:id', personController.getDeptoByCiudad)

module.exports = router