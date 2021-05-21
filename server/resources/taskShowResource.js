module.exports = function(task, user) {
  return {
    task: {
      _id: task._id,
      title: task.title,
      body: task.body,
      dueDate: task.dueDate,
      completed: task.completed,
      author: {
        _id: user._id,
        username: user.username
      }
    }
  }
}
