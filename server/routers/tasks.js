const express = require('express')

const router = express.Router()

// POST /api/tasks
router.post('/', (req, res) => {
  res.send('post.tasks - create a task')
})

// GET /api/tasks
router.get('/', (req, res) => {
  res.send('get.tasks - get all tasks')
})

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  res.send('get.tasks/:id - get task by id')
})

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  res.send('put.tasks/:id - update a task')
})

// DEL /api/tasks/:id
router.delete('/:id', (req, res) => {
  res.send('delete.tasks/:id - delete a task')
})

module.exports = router
