<template>
  <div>
    <Error v-if="errors">{{ errors.error }}</Error>

    <h1>Register</h1>

    <form class="custom-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          name="firstName"
          v-model="firstName"
        >
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          name="lastName"
          v-model="lastName"
        >
      </div>

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

      <button type="submit" class="btn btn-secondary">Register</button>
    </form>
  </div>  
</template>

<script>
import auth from '../../services/AuthService'
import Error from '../../components/Error'

export default {
  name: 'Register',

  components: {
    Error
  },

  data() {
    return {
      username: null,
      firstName: null,
      lastName: null,
      password: null,
      errors: null
    }
  },

  methods: {
    async onSubmit() {
      this.errors = null

      const user = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      }

      try {
        // Register new user
        const response = await auth.register(user)

        if (response.status === 201) {
          // Login new user
          await auth.login({
            username: user.username,
            password: user.password
          })

          // Redirect to home
          this.$router.push({ name: 'home' })
        }
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
