<template>
  <div>
    <h1>Login</h1>

    <form class="custom-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
        >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
        >
      </div>

      <button type="submit" class="btn btn-secondary">Submit</button>
    </form>
  </div>  
</template>

<script>
import auth from '../../services/AuthService'

export default {
  name: 'login',

  methods: {
    onSubmit: function() {
      auth.login()
      this.$router.push({ name: 'home' })
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
