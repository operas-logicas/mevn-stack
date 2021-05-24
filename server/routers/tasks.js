const express = require('express')
const { requireLogin } = require('../services/AuthService')
const taskController = require('../controllers/TaskController')

const router = express.Router()

// GET /api/tasks
router.get('/', requireLogin, taskController.index)

// GET /api/tasks/:id
router.get('/:id', requireLogin, taskController.show)

// POST /api/tasks
router.post('/', requireLogin, taskController.store)

// PUT /api/tasks/:id
router.put('/:id', requireLogin, taskController.update)

// DEL /api/tasks/:id
router.delete('/:id', requireLogin, taskController.remove)

module.exports = router
