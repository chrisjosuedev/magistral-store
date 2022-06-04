const express = require('express')
const router = express.Router()
const sysCont = require('../controllers/sysController')
const { isLoggedIn } = require('../lib/auth')


router.get('/general', isLoggedIn, sysCont.general)



module.exports = router