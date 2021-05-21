class TaskController {
  // Find all tasks
  index(req, res) {
    return res.status(200).json()
  }

  // Find task by id
  show(req, res) {
    return res.status(200).json()
  }

  // Create new task
  store(req, res) {
    return res.status(201).json()
  }

  // Update task
  update(req, res) {
    return res.status(204).json()
  }

  // Delete task
  remove(req, res) {
    return res.status(204).json()
  }
}

module.exports = new TaskController
