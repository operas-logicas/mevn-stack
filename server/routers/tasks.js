const express = require('express')
const taskController = require('../controllers/TaskController')

const router = express.Router()

// GET /api/tasks
router.get('/', taskController.index)

// GET /api/tasks/:id
router.get('/:id', taskController.show)

// POST /api/tasks
router.post('/', taskController.store)

// PUT /api/tasks/:id
router.put('/:id', taskController.update)

// DEL /api/tasks/:id
router.delete('/:id', taskController.remove)

module.exports = router
