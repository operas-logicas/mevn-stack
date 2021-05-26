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
          name="username"
          v-model="username"
        >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          name="password"
          v-model="password"
        >
      </div>

      <button type="submit" class="btn btn-secondary">Login</button>
    </form>
  </div>  
</template>

<script>
import auth from '../../services/AuthService'

export default {
  name: 'Login',

  data() {
    return {
      username: null,
      password: null
    }
  },

  methods: {
    async onSubmit() {
      const user = {
        username: this.username,
        password: this.password
      }

      try {
        // Login user
        await auth.login(user)

        // Redirect to home
        this.$router.push({ name: 'home' })
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
