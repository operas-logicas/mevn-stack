<template>
  <div>
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
import taskService from '../../services/TaskService'

export default {
  name: 'TasksCreate',

  data() {
    return {
      task: {
        title: null,
        body: null,
        dueDate: null
      }
    }
  },

  methods: {
    async onSubmit() {
      try {
        // Create task
        await taskService.createTask({ task: this.task })

        // Redirect to home
        this.$router.push({ name: 'tasks-all' })
      } catch (error) {
        console.log(error.response.data)
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
