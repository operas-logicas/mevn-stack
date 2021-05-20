import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import TasksAll from '../views/tasks/TasksAll.vue'
import TasksCreate from '../views/tasks/TasksCreate.vue'
import TasksEdit from '../views/tasks/TasksEdit.vue'

Vue.use(VueRouter)

const isLoggedIn = false

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) next({ name: 'home' })
      next()
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) next({ name: 'home' })
      next()
    }
  },
  {
    path: '/tasks',
    name: 'tasks-all',
    component: TasksAll,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn) next({ name: 'login' })
      next()
    }
  },
  {
    path: '/tasks/new',
    name: 'tasks-create',
    component: TasksCreate,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn) next({ name: 'login' })
      next()
    }
  },
  {
    path: '/tasks/:id',
    name: 'tasks-edit',
    component: TasksEdit,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn) next({ name: 'login' })
      next()
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  mode: 'history',
  routes
})

export default router
