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

/* --- POST DE MARCAS --- */
router.post('/marcas/new', articulosController.newMarca)


// /articulos/colores
/* --- GET --- */
router.get('/colores', articulosController.listColores)

/* --- POST --- */
router.post('/colores/new', articulosController.newColor)


/* /articulos/tipos/~ */
 
// /articulos/tipos/ropa
router.get('/tipos/ropa', articulosController.listRopa)

// /tipos de cada ropa
router.get('/tipos/ropa-list', articulosController.listTiposRopa)

/* --- POST DE TIPO DE ROPA --- */
router.post('/tipos/ropa-list/new', articulosController.newTipoRopa)

// /articulos/tipos/calzado
router.get('/tipos/calzado', articulosController.listCalzado)

// /tipos de cada calzado
router.get('/tipos/calzado-list', articulosController.listTiposCalzado)

/* --- POST DE TIPO DE CALZADO --- */
router.post('/tipos/calzado-list/new', articulosController.newTipoCalzado)

// /articulos/tipos/accesorios
router.get('/tipos/accesorios', articulosController.listAccesorios)

// /tipos de cada accesorio
router.get('/tipos/accesorios-list', articulosController.listTiposAccesorios)

/* --- POST DE TIPO DE ACCESORIO --- */
router.post('/tipos/accesorios-list/new', articulosController.newTipoAccesorio)

// /articulos/proveedores
router.get('/proveedores', articulosController.listProveedores)

/* --- POST DE PROVEEDORES --- */
router.post('/proveedores/new', articulosController.newProveedor)


module.exports = router