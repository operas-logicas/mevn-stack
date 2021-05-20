const express = require('express')

const router = express.Router()

// GET /api/users
router.get('/', (req, res) => {
  res.send('get.users - get all users')
})

// GET /api/users/:id
router.get('/:id', (req, res) => {
  res.send('get.user/:id - get user by id')
})

module.exports = router
