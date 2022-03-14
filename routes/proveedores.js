const express = require('express')
const router = express.Router()
const proveedoresController = require('../controllers/proveedoresController')


// Proveedores 
router.get('/', proveedoresController.listProveedores)

/* --- POST DE PROVEEDORES --- */
router.post('/new', proveedoresController.newProveedor)

/* Editar Proveedores */
router.get('/:id', proveedoresController.getProveedorById)

router.post('/edit/:id', proveedoresController.editProveedor)

// Eliminar Proveedores
router.get('/delete/:id', proveedoresController.deleteProveedor)



module.exports = router