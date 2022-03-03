const express = require('express')
const router = express.Router()

// /dashboard
router.get('/', (req, res) => {
    res.render('home/dashboard')
})

module.exports = router