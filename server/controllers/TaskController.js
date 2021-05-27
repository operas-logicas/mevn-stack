const moment = require('moment')
const Task = require('../models/Task')
const User = require('../models/User')
const { getUserId } = require('../services/AuthService')
const taskShowResource = require('../resources/taskShowResource')

class TaskController {
  // Find all tasks
  async index(req, res) {
    try {
      const tasks = await Task
        .find()
        .sort('dueDate title')
        .populate('author', 'username')
        .select('-__v')

      return res.status(200).json({ tasks })

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Find task by id
  async show(req, res) {
    try {
      const task = await Task.findById(req.params.id)
      if (!task) return res.status(404).json({ error: 'Task not found!' })

      const user = await User.findById(task.author._id)
      if (!user) return res.status(500).json({ error: 'Something went wrong!'})

      return res.status(200).json(taskShowResource(task, user))

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Create new task
  async store(req, res) {
    const userId = getUserId(req)

    try {
      const user = await User.findById(userId)
      if (!user) return res.status(400).json({ error: 'Invalid user!' })

      const validation = Task.validateRequest(req.body.task)
      if (!validation.isValid)
        return res.status(400).json({ error: validation.error })

      const task = new Task(req.body.task)
      task.author = user._id
      task.dueDate = moment(task.dueDate)

      await task.save()
      return res.status(201).json(taskShowResource(task, user))

    } catch (error) {
      const errors = [];
      for (const field in error.errors)
        errors.push(error.errors[field].message);
      return res.status(400).json({ error: errors.join(' ') })
    }
  }

  // Update task
  async update(req, res) {
    const userId = getUserId(req)

    try {
      const user = await User.findById(userId)
      if (!user) return res.status(400).json({ error: 'Invalid user!' })

      const task = await Task.findById(req.params.id)
      if (!task) return res.status(404).json({ error: 'Task not found!' })

      if (task.author._id.toString() !== userId)
        return res.status(403).json({ error: 'Not authorized!' })

      const validation = Task.validateRequest(req.body.task)
      if (!validation.isValid)
        return res.status(400).json({ error: validation.error })

      req.body.task.dueDate = moment(req.body.task.dueDate)

      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body.task,
        { runValidators: true, new: true }
      )

      return res.status(201).json(taskShowResource(updatedTask, user))

    } catch (error) {
      const errors = [];
      for (const field in error.errors)
        errors.push(error.errors[field].message);
      return res.status(400).json({ error: errors.join(' ') })
    }
  }

  // Delete task
  async remove(req, res) {
    const userId = getUserId(req)

    try {
      const user = await User.findById(userId)
      if (!user) return res.status(400).json({ error: 'Invalid user!' })

      const task = await Task.findById(req.params.id)
      if (!task) return res.status(404).json({ error: 'Task Not Found!' })

      if (task.author._id.toString() !== userId)
        return res.status(403).json({ error: 'Not authorized!' })

      await Task.deleteOne({ _id: req.params.id })
      return res.status(204).json()

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new TaskController()
