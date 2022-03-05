const express = require('express')
const router = express.Router()
const articulosController = require('../controllers/articulosController')

/* ----------- ARTICULOS --------------- */
// GET 
router.get('/', articulosController.listArticulos)

// Ropa
router.get('/ropa', articulosController.listRopaArticulos)

// Calzado
router.get('/calzado', articulosController.listRopaCalzado)

// Accesorio
router.get('/accesorios', articulosController.listRopaAccesorio)

// POST - AGREGAR A ARTICULOS A DB
// Ropa
router.post('/newRopa', articulosController.newRopa)

// Calzado
router.post('/newCalzado', articulosController.newCalzado)

// Accesorio
router.post('/newAccesorio', articulosController.newAccesorio)



/* ------------ FIN ARTICULOS ------------- */


// /articulos/marcas
router.get('/marcas', articulosController.listMarcas)

// /articulos/colores
router.get('/colores', articulosController.listColores)

router.get('/colores/new', articulosController.newColor)

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