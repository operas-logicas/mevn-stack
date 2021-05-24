const express = require('express')
const { requireLogin } = require('../services/AuthService')
const userController = require('../controllers/UserController')

const router = express.Router()

// GET /api/users
router.get('/', requireLogin, userController.index)

// GET /api/users/:id
router.get('/:id', requireLogin, userController.show)

module.exports = router
