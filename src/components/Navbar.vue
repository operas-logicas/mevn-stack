<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
      <router-link to="/" class="navbar-brand">
        <img alt="Vue logo" src="../assets/logo.png" />
        Task Manager
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link
              :to="{ name: 'home' }"
              class="nav-link"
              exact
            >Home</router-link>
          </li>

          <li class="nav-item">
            <router-link
              :to="{ name: 'tasks-all' }"
              class="nav-link"
              exact
            >Tasks</router-link>
          </li>

          <li class="nav-item">
            <router-link
              :to="{ name: 'register' }"
              class="nav-link"
              exact
            >Register</router-link>
          </li>

          <li class="nav-item">
            <router-link
              :to="{ name: 'login' }"
              class="nav-link"
              exact
            >Login</router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">
              {{
                this.$store.state.username
                ? this.$store.state.username
                : 'User'
              }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  height: 6rem;
}

.navbar-brand {
  text-transform: uppercase;
  letter-spacing: 3px;
}

.navbar-brand img {
  max-height: 25px;
}

.nav-link {
  text-transform: uppercase;
}

@media screen and (max-width: 767px) {
  #navbarCollapse {
    width: 100%;
    position: fixed;
    top: 75px;
    left: 0;
    padding-left: 20px;
    padding-bottom: 5px;
    background-color: #373f46;
  }
}
</style>
