const express = require('express')
const router = express.Router()
const articulosController = require('../controllers/articulosController')

/* ----------- ARTICULOS --------------- */
// GET 
router.get('/', articulosController.listArticulos)

router.get('/:id', articulosController.getArticuloById)

// Ropa
router.get('/ropa/view', articulosController.listRopaArticulos)

/* Editar Ropa */
router.get('/ropa/:id', articulosController.getArticuloByRopa)

router.post('/ropa/edit/:id', articulosController.editArticuloRopa)

// ---- DELETE ROPA
router.get('/ropa/delete/:id', articulosController.deleteRopa)

// Calzado
router.get('/calzado/view', articulosController.listRopaCalzado)

/* Editar Calzado */
router.get('/calzado/:id', articulosController.getArticuloByCalzado)

router.post('/calzado/edit/:id', articulosController.editArticuloCalzado)

// ---- DELETE Calzado
router.get('/calzado/delete/:id', articulosController.deleteCalzado)

// Accesorio
router.get('/accesorios/view', articulosController.listRopaAccesorio)

/* Editar Accesorios */
router.get('/accesorios/:id', articulosController.getArticuloByAccesorio)

router.post('/accesorios/edit/:id', articulosController.editArticuloAccesorio)

// ---- DELETE Calzado
router.get('/accesorios/delete/:id', articulosController.deleteAccesorio)

// POST - AGREGAR A ARTICULOS A DB
// Ropa
router.post('/newRopa', articulosController.newRopa)

// Calzado
router.post('/newCalzado', articulosController.newCalzado)

// Accesorio
router.post('/newAccesorio', articulosController.newAccesorio)



/* ------------ FIN ARTICULOS ------------- */


// /articulos/marcas
router.get('/marcas/view', articulosController.listMarcas)

/* --- POST DE MARCAS --- */
router.post('/marcas/new', articulosController.newMarca)

/* Editar Marca */
router.get('/marcas/:id', articulosController.getMarcaById)

router.post('/marcas/edit/:id', articulosController.editMarca)

// Delete marcas
router.get('/marcas/delete/:id', articulosController.deleteMarca)

// /articulos/colores
/* --- GET --- */
router.get('/colores/view', articulosController.listColores)

/* --- POST --- */
router.post('/colores/new', articulosController.newColor)

/* Editar Colores */
router.get('/colores/:id', articulosController.getColorById)

router.post('/colores/edit/:id', articulosController.editColor)

// Delete marcas
router.get('/colores/delete/:id', articulosController.deleteColor)

/* /articulos/tipos/~ */
 
// /articulos/tipos/ropa
router.get('/tipos/ropa', articulosController.listRopa)

// /tipos de cada ropa
router.get('/tipos/ropa-list', articulosController.listTiposRopa)

/* --- POST DE TIPO DE ROPA --- */
router.post('/tipos/ropa-list/new', articulosController.newTipoRopa)

/* Editar Tipos de Ropa */
router.get('/tipos/ropa/:id', articulosController.getTipoRopaById)

router.post('/tipos/ropa/edit/:id', articulosController.editTipoRopa)

// Delete Tipos de Ropa
router.get('/tipos/ropa/delete/:id', articulosController.deleteTipoRopa)

// /articulos/tipos/calzado
router.get('/tipos/calzado', articulosController.listCalzado)

// /tipos de cada calzado
router.get('/tipos/calzado-list', articulosController.listTiposCalzado)

/* --- POST DE TIPO DE CALZADO --- */
router.post('/tipos/calzado-list/new', articulosController.newTipoCalzado)

/* Editar Tipos de Calzado */
router.get('/tipos/calzado/:id', articulosController.getTipoCalzadoById)

router.post('/tipos/calzado/edit/:id', articulosController.editTipoCalzado)

// Delete Tipos de Ropa
router.get('/tipos/calzado/delete/:id', articulosController.deleteTipoCalzado)

// /articulos/tipos/accesorios
router.get('/tipos/accesorios', articulosController.listAccesorios)

/* Editar Tipos de Accesorios */
router.get('/tipos/accesorios/:id', articulosController.getTipoAccesorioById)

router.post('/tipos/accesorios/edit/:id', articulosController.editTipoAccesorio)

// Delete Tipos de Accesorios
router.get('/tipos/accesorios/delete/:id', articulosController.deleteTipoAccesorio)

// /tipos de cada accesorio
router.get('/tipos/accesorios-list', articulosController.listTiposAccesorios)

/* --- POST DE TIPO DE ACCESORIO --- */
router.post('/tipos/accesorios-list/new', articulosController.newTipoAccesorio)

// /articulos/proveedores
router.get('/proveedores/view', articulosController.listProveedores)

/* --- POST DE PROVEEDORES --- */
router.post('/proveedores/new', articulosController.newProveedor)

/* Editar Proveedores */
router.get('/proveedores/:id', articulosController.getProveedorById)

router.post('/proveedores/edit/:id', articulosController.editProveedor)

// Eliminar Proveedores
router.get('/proveedores/delete/:id', articulosController.deleteProveedor)

module.exports = router