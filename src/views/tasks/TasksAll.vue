<template>
  <div class="d-flex flex-column">
    <Error v-if="errors">{{ errors.error }}</Error>

    <h1>Tasks</h1>

    <div class="mb-4">
      <router-link
        :to="{ name: 'tasks-create' }"
        class="btn btn-success ml-2"
        exact
      >Create Task</router-link>
    </div>

    <div v-if="tasks && tasks.length > 0"
         class="d-flex flex-wrap justify-content-start">
      <div v-for="task in tasks"
           :key="task._id"
           class="card mb-2 ml-2 text-white bg-dark"
           style="width: 18rem">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">{{ task.title }}</h5>
            <span
              class="small"
              :class="[
                { 'late': taskIsLate(task.dueDate) && !task.completed }
              ]"
            >{{ task.dueDate | makeItNice }}</span>
          </div>

          <h6 class="card-subtitle mb-2 text-muted">
            Created by {{ task.author.username }}
          </h6>

          <p class="card-text">{{ task.body }}</p>

          <div v-if="isAuthor(task)" class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              :disabled="task.completed"
              v-model="task.completed"
              @click="markAsCompleted(task)"
            >
            <label for="form-check-label">Completed</label>
          </div>

          <div v-if="isAuthor(task)"
               class="d-flex justify-content-between">
            <router-link
              :to="{ name: 'tasks-edit', params: { id: task._id } }"
              class="card-link btn btn-primary"
              exact
            >Edit</router-link>

            <a href="#"
               class="card-link btn btn-danger"
               @click.prevent="currentTaskId = task._id"
               v-b-modal.modal1
            >Delete</a>
          </div>
        </div>
      </div>

      <div>
        <b-modal id="modal1" ref="modal" title="Delete Confirmation" centered>
          <p class="my-4">Are you sure you would like to delete this task?</p>

          <div slot="modal-footer" class="w-100 text-right">
            <b-button
              slot="md"
              class="mr-1"
              variant="danger"
              @click="deleteTask"
            >Delete</b-button>

            <b-button
              slot="md"
              variant="secondary"
              @click="closeModal"
            >Cancel</b-button>
          </div>
        </b-modal>
      </div>
    </div>

    <div v-else class="ml-2">
      <div class="alert alert-info">No tasks found.</div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import Error from '../../components/Error'
import taskService from '../../services/TaskService'

export default {
  name: 'TasksAll',

  components: {
    Error
  },

  data() {
    return {
      tasks: null,
      currentTaskId: null,
      errors: null
    }
  },

  methods: {
    closeModal() {
      this.$refs['modal'].hide()
      this.currentTaskId = null
    },

    async deleteTask() {
      this.errors = null
      this.$refs['modal'].hide()

      try {
        await taskService.deleteTask(this.currentTaskId)

        const index = this.tasks.findIndex(
          task => task._id === this.currentTaskId
        )
        this.tasks.splice(index, 1)

        this.currentTaskId = null
      } catch (error) {
        this.errors = error.response.data
      }
    },

    isAuthor(task) {
      return task.author._id === this.$store.state.userId
    },

    async markAsCompleted(task) {
      this.errors = null
      task.completed = true

      try {
        await taskService.updateTask(task._id, { task })
      } catch (error) {
        this.errors = error.response.data
      }
    },

    taskIsLate(date) {
      return moment(date).isBefore()
    },
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const response = await taskService.getAllTasks()
      next(vm => vm.tasks = response.data.tasks)
    } catch (error) {
      this.errors = error.response.data
    }
  }
}
</script>

<style>
.late {
  color: #dc3545
}

.modal-title,
.modal-body p {
  color: #000 !important;
}
</style>
