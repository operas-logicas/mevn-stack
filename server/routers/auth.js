const express = require('express')

const router = express.Router()

// POST /api/auth
router.post('/', (req, res) => {
  res.send('post.auth - login')
})

module.exports = router
