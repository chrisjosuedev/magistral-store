const express = require('express')
const router = express.Router()
const articulosController = require('../controllers/articulosContoller')

// /articulos 
router.get('/', articulosController.listArticulos)

// /articulos/marcas
router.get('/marcas', articulosController.listMarcas)

// /articulos/colores
router.get('/colores', articulosController.listColores)

/* /articulos/tipos/~ */
 
// /articulos/tipos/ropa
router.get('/tipos/ropa', articulosController.listRopa)

// /articulos/tipos/ropa
router.get('/tipos/calzado', articulosController.listCalzado)

// /articulos/tipos/accesorios
router.get('/tipos/accesorios', articulosController.listAccesorios)

// /articulos/proveedores
router.get('/proveedores', articulosController.listProveedores)

module.exports = router