import http from './HttpService'

class TaskService {
  getAllTasks() {
    return http().get('/tasks')
  }

  getTaskById(id) {
    return http().get(`/tasks/${id}`)
  }

  createTask(task) {
    return http().post('/tasks', task)
  }

  updateTask(id, task) {
    return http().put(`/tasks/${id}`, task)
  }

  deleteTask(id) {
    return http().delete(`/tasks/${id}`)
  }
}

export default new TaskService()
