const express = require('express')
const router = express.Router()
const confController = require('../controllers/configController')


// Settings

// /categoria-laboral
router.get('/categoria-laboral', confController.listCategoriaLaboral)

// /usuarios
router.get('/usuarios', confController.listUsuarios)

module.exports = router