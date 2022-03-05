const express = require('express')
const router = express.Router()
const confController = require('../controllers/configController')


// Settings

// /categoria-laboral
router.get('/categoria-laboral', confController.listCategoriaLaboral)

/* POST CATEGORIA LABORAL */
router.post('/categoria-laboral/new', confController.newCategoriaLaboral)

// /usuarios
router.get('/usuarios', confController.listUsuarios)

// POST Usuario
router.post('/usuarios/new', confController.newUsuario)

module.exports = router