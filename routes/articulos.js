const express = require('express')
const router = express.Router()
const articulosController = require('../controllers/articulosContoller')

// /articulos 
router.get('/', articulosController.listArticulos)

// /articulos/marcas
router.get('/marcas', articulosController.listMarcas)

module.exports = router