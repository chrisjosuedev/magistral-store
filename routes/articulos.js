const express = require('express')
const router = express.Router()
const articulosController = require('../controllers/articulosController')

// /articulos 
router.get('/', articulosController.listArticulos)

// /articulos/marcas
router.get('/marcas', articulosController.listMarcas)

// /articulos/colores
router.get('/colores', articulosController.listColores)

/* /articulos/tipos/~ */
 
// /articulos/tipos/ropa
router.get('/tipos/ropa', articulosController.listRopa)

// /tipos de cada ropa
router.get('/tipos/ropa-list', articulosController.listTiposRopa)

// /articulos/tipos/calzado
router.get('/tipos/calzado', articulosController.listCalzado)

// /tipos de cada calzado
router.get('/tipos/calzado-list', articulosController.listTiposCalzado)

// /articulos/tipos/accesorios
router.get('/tipos/accesorios', articulosController.listAccesorios)

// /tipos de cada ropa
router.get('/tipos/accesorios-list', articulosController.listTiposAccesorios)

// /articulos/proveedores
router.get('/proveedores', articulosController.listProveedores)

module.exports = router