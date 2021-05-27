<template>
  <div>
    <Error v-if="errors">{{ errors.error }}</Error>

    <h1>Edit Task</h1>

    <form class="custom-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          name="title"
          v-model="task.title"
        >
      </div>

      <div class="form-group">
        <label for="body">Body</label>
        <textarea
          class="form-control"
          cols="30" rows="10"
          id="body"
          name="body"
          v-model="task.body"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="dueDate">Due Date</label>
        <input
          type="date"
          class="form-control"
          id="dueDate"
          name="dueDate"
          v-model="task.dueDate"
        >
      </div>

      <button type="submit" class="btn btn-secondary">Update</button>
    </form>
  </div>  
</template>

<script>
import moment from 'moment'
import Error from '../../components/Error'
import taskService from '../../services/TaskService'

export default {
  name: 'TasksEdit',

  components: {
    Error
  },

  data() {
    return {
      task: {
        title: null,
        body: null,
        dueDate: null
      },
      errors: null
    }
  },

  methods: {
    async onSubmit() {
      this.errors = null

      try {
        // Update task
        await taskService.updateTask(this.task._id, { task: this.task })

        // Redirect to all tasks
        this.$router.push({ name: 'tasks-all' })
      } catch (error) {
        this.errors = error.response.data
      }
    }
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const task = (await taskService.getTaskById(to.params.id)).data.task
      task.dueDate = moment(task.dueDate).format('YYYY-MM-DD')
      next(vm => vm.task = task)
    } catch (error) {
      this.errors = error.response.data
    }
  }
}
</script>

<style scoped>
.custom-form {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
} 
</style>
