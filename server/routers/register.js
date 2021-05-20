const express = require('express')

const router = express.Router()

// POST /api/register
router.post('/', (req, res) => {
  res.send('post.register - register a new user')
})

module.exports = router
