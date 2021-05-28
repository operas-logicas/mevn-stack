<template>
  <div>
    <Error v-if="errors">{{ errors.error }}</Error>

    <h1>Create Task</h1>

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

      <button type="submit" class="btn btn-secondary">Create</button>
    </form>
  </div>  
</template>

<script>
import moment from 'moment'
import Error from '../../components/Error'
import taskService from '../../services/TaskService'

export default {
  name: 'TasksCreate',

  components: {
    Error
  },

  data() {
    return {
      task: {
        title: null,
        body: null,
        dueDate: moment.utc().format('YYYY-MM-DD')
      },
      errors: null
    }
  },

  methods: {
    async onSubmit() {
      this.errors = null

      try {
        // Create task
        await taskService.createTask({ task: this.task })

        // Redirect to all tasks
        this.$router.push({ name: 'tasks-all' })
      } catch (error) {
        this.errors = error.response.data
      }
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
