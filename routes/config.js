const express = require('express')
const router = express.Router()
const confController = require('../controllers/configController')


// Settings

// /categoria-laboral
router.get('/categoria-laboral', confController.listCategoriaLaboral)

/* POST CATEGORIA LABORAL */
router.post('/categoria-laboral/new', confController.newCategoriaLaboral)

// -- Edit Categoria
router.get('/categoria-laboral/:id', confController.getCategoriaById)

router.post('/categoria-laboral/edit/:id', confController.editCategoriaLaboral)

// Eliminar Categoria Laboral
router.get('/categoria-laboral/delete/:id', confController.deleteCatLaboral)

// /usuarios
router.get('/usuarios', confController.listUsuarios)

// Eliminar Usuario
router.get('/usuarios/delete/:username', confController.deleteUsuario)

// POST Usuario
router.post('/usuarios/new', confController.newUsuario)

// --- Edit Usuario
router.get('/usuarios/:username', confController.getEmpleadoByUser)

router.post('/usuarios/edit/:username', confController.editUser)

module.exports = router