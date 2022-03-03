const express = require('express')
const router = express.Router()

// Dashboard
router.get('/', (req, res) => {
    res.send("Login")
})

module.exports = router